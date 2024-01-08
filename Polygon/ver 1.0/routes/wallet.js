
const express = require('express');
const {Web3} = require('web3');
const HDWallet = require('ethereum-hdwallet');
const BN = require('bn.js');
var fs = require('fs');
var jsonFile = "./abi/erc20_abi.json";
var abiArray = JSON.parse(fs.readFileSync(jsonFile));


const { route } = require('express/lib/application');
const randomBytes = require('randombytes');
const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');
const nacl = require('tweetnacl');
const bs58 = require('bs58');
const router = express.Router();
module.exports = router;
// node v16 이상...



const TYPE = `m/44'/60'/0'/0/0`;
const providerURL = 'PROVIDER'; // testnet

const web3 = new Web3(new Web3.providers.HttpProvider(providerURL));





function generateAccount(mnemonic) {

  const hdwallet = HDWallet.fromMnemonic(mnemonic)
  const walletAddr = "0x"+hdwallet.derive(TYPE).getAddress().toString('hex');
  const walletPublicKey = hdwallet.derive(TYPE).getPublicKey().toString('hex'); 
  const walletPrivateKey = hdwallet.derive(TYPE).getPrivateKey().toString('hex'); 
  const accountObject  ={};
  accountObject.address = walletAddr;
  accountObject.publicKey  = walletPublicKey;
  accountObject.privateKey  = walletPrivateKey; 
  return accountObject;
  }



//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의
router.get('/createWallet', async (req, res) => { // 지갑 생성 
  const account = {};
    try {
      const mnemonic = bip39.generateMnemonic();
        
      console.log(generateAccount(mnemonic)); 
      account.wallet = generateAccount(mnemonic); 
      account.mnemonic = mnemonic;
      account.code = 200;
      res.send(account);
    } catch (err) {
      account.code = 500;
      res.send(account);
    }
  });


  router.get('/restoreWallet', async (req, res) => { // 지갑 복구 
    const account = {};
    try {
      const mnemonic = req.query.mnemonic;
      account.wallet = generateAccount(mnemonic); 
      account.mnemonic = mnemonic;
      account.code = 200;
      res.send(account);

    } catch (err) {
      account.code = 500;
      res.send(account);
    }

  });


  router.get('/matic/balance', async (req, res) => { // matic 수량 조회 
      const walletBalance = {};
    try {
      const addr = req.query.address;
      const balance = await web3.eth.getBalance(addr, "latest")
      walletBalance.balance = web3.utils.fromWei(balance, 'ether');
      walletBalance.code  = 200;
      } catch (err){
      walletBalance.code  = 500;
      console.log("error:"+ err); 
    }
    res.send(walletBalance);
  });


  router.get('/erc20/balance', async (req, res) => { // erc20 수량 조회 
    const walletBalance = {};
  try {
    const walletAddress = req.query.walletAddress;
    const tokenAddress  = req.query.tokenAddress;

    const contract = new web3.eth.Contract(abiArray, tokenAddress, {from: walletAddress}); 

    const balance = await contract.methods.balanceOf(walletAddress).call();
    walletBalance.balance  = web3.utils.fromWei(balance, "ether");    
    walletBalance.code  = 200;

  } catch (err){

    walletBalance.code  = 500;
    console.log("error:"+ err); 
  }
  res.send(walletBalance);
});



router.get('/erc20/transfer', async (req, res) => { // erc20 이체 -> 테스트 중...
  const walletTransfer = {};
try {

    const tokenAddress = req.query.tokenAddress;
    const toAddress = req.query.toAddress;
    const amount = req.query.amount;

    let privateKey = (req.query.privateKey.substr(0, 2)!='0x')?'0x'+req.query.privateKey:req.query.privateKey;

    // Creating a signing account from a private key
    const signer = web3.eth.accounts.privateKeyToAccount(
      privateKey
    );
    let tokenAmount = web3.utils.toWei(amount.toString(), 'ether'); 
    const s  = {};
    s.account = signer.address;
    s.account = signer.publicKey;
    const nonce = await web3.eth.getTransactionCount(signer.address);
    const gasPrice = await web3.eth.getGasPrice();


    const contract = new web3.eth.Contract(abiArray, tokenAddress, {from: signer.address}); 
    let data = contract.methods.transfer(toAddress, tokenAmount).encodeABI(); 

    let rawTransaction ={
      "from":signer.address,
      "gasPrice":gasPrice,
      "gasLimit":3000000,
      "to":tokenAddress,
      "value": "0x0",
      "data":contract.methods.transfer(toAddress, tokenAmount).encodeABI(),
      "nonce":nonce
    };

    signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, signer.privateKey)
    const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    walletTransfer.tx = transactionReceipt.transactionHash;
    walletTransfer.signer = s;
    walletTransfer.amount  =  amount;
    walletTransfer.tokenAddress = tokenAddress;
    walletTransfer.code  = 200;
} catch (err){

  walletTransfer.code  = 500;
  console.log("error:"+ err); 
}
res.send(walletTransfer);
});




router.get('/matic/transfer', async (req, res) => { // matic 이체
  const walletTransfer = {};
try {

  const toAddress = req.query.toAddress;
  const amount = req.query.amount;

  let privateKey = (req.query.privateKey.substr(0, 2)!='0x')?'0x'+req.query.privateKey:req.query.privateKey;

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    privateKey
  );

  const tokenAmount = web3.utils.toWei(amount.toString(), 'ether')
  const gasLimit = await web3.eth.estimateGas({
    from: signer.address,
    to: toAddress,
});
const gasPrice = await web3.eth.getGasPrice();
  web3.eth.accounts.wallet.add(signer);
  web3.eth.defaultAccount = signer.address;
  const transactionObject = {
      from: signer.address,
      to: toAddress,
      value: tokenAmount,
      gasPrice: gasPrice, 
      gasLimit: gasLimit , 

  };
  const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  walletTransfer.tx = transactionReceipt.transactionHash;
  walletTransfer.code  = 200;

} catch (err){

  walletTransfer.code  = 500;
  console.log("error:"+ err); 
}
res.send(walletTransfer);
});





router.get('/test2', async (req, res) => { 

  ob = {};
  try {
    const amount = req.query.amount;
    const tokenAddress  = req.query.tokenAddress;
  
    const contract = new web3.eth.Contract(abiArray, tokenAddress); 
  
  
    const d = await contract.methods.decimals(tokenAddress).call();

    const decimal = Number(d);

    let tokenAmount =new BN(web3.utils.toWei(amount, 'ether'));
    ob.decimals = decimal;
    ob.tokenAmount = tokenAmount;
    ob.amount = amount; 
    ob.code = 200;

  } catch(err){
    ob.code = 500;
    ob.err = err;
  }
  res.send(ob);
  
});





router.get('/test', async (req, res) => { // 

  txObject  = {};
try {

  const to  = "TO";
  const from  = "FROM"; 

    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await web3.eth.estimateGas({
      from: from,
      to: to,
  });

  const txPriceWei = new BigNumber(gasLimit * gasPrice);
  const txPriceEth = new BigNumber(web3.utils.fromWei(txPriceWei.toString(), 'ether'));
  const txPriceUSD = new BigNumber(txPriceEth * 1800);
  txObject.gasPrice = new BigNumber(gasPrice);
  txObject.gasLimit = new BigNumber(gasLimit); 
  txObject.txPriceWei = txPriceWei;
  txObject.txPriceEth = txPriceEth;
  txObject.txPriceUSD = txPriceUSD; 

  txObject.code = 200; 

} catch (err){

  txObject.code  = 500;
  console.log("error:"+ err); 
}
res.send(txObject);
});



