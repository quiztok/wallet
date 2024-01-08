const {Web3} = require('web3');
const HDWallet = require('ethereum-hdwallet')
const BN = require('bn.js');
const https = require("https");

const ipfsCLient = require('ipfs-http-client'); 
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const { route } = require('express/lib/application');
const randomBytes = require('randombytes');
const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');
const nacl = require('tweetnacl');
const bs58 = require('bs58');
const router = express.Router();
const fetch = require('node-fetch');



module.exports = router;

var BigNumber = require('big-number');

var jsonFile = "./abi/erc721_abi.json";
var abiArray = JSON.parse(fs.readFileSync(jsonFile));



const projectId = "{PROJECTID}";
const projectSecret = "{PROJECTSECRET}";
const authorization = "Basic "+btoa(projectId + ":" + projectSecret);
//const auth = 'Basic' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const imgFilePath = "./images/"; 


const TYPE = `m/44'/60'/0'/0/0`;
const providerURL = 'PROVIDER'; // testnet


const web3 = new Web3(new Web3.providers.HttpProvider(providerURL));
const CONTRACT_ADDRESS = "{CONTRACT_ADDRESS}";


const ipfs = new ipfsCLient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers:{
         authorization        
    }
});




const addFile = async (fileName, filePath) => {
    const file = fs.readFileSync(filePath);
    const fileAdded = await ipfs.add({path : fileName, content : file});
    const fileHash = String(fileAdded.cid);

    return fileHash;
}

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

function getNftMintData(name , img, description , author, regDate , tag ){

        const attributesArr =['Author Name', 'Date of creation', 'tag']; 
        let attributesDataArr  = [author , regDate, tag];
    
    
        let nftData = {};
        let nftAttributes = [];
        for(let i = 0; i< attributesArr.length; i++){
            let tempAttr = {};
            tempAttr.trait_type = attributesArr[i];
            tempAttr.value  = attributesDataArr[i]; 
            nftAttributes.push(tempAttr);
        }
    
        nftData.name = name;
        nftData.image = img;
        nftData.description = description;
        nftData.attributes = nftAttributes
        const jsonDir = "./nft_json/"+name+".json"; 
        //nftData.jsonDir  = jsonDir;
        if(fs.existsSync(jsonDir)){
            fs.unlinkSync(jsonDir);
        }
        fs.writeFileSync(jsonDir , JSON.stringify(nftData));

        return nftData;
    }
    
    function getDate() {
        const today = new Date();
      
        const year = today.getFullYear(); // 2023
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 06
        const day = today.getDate().toString().padStart(2, '0'); // 18
      
        const dateString = year + '-' + month + '-' + day; // 2023-06-18
      
        return dateString;
      }
      
  
router.get('/mint', async (req, res) => { // 테스트
    const ipfsObj = {};
    try {
        let wallet = generateAccount(req.query.mnemonic);

        let f = imgFilePath+req.query.fileName; 
        const fileHash = await addFile(req.query.fileName, f);
        
        ipfsObj.fileHash = fileHash; 
        ipfsObj.imgUrl  = "https://{URL}/"+fileHash;


        const nftContract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
        
        const signer = web3.eth.accounts.privateKeyToAccount(
            '0x'+wallet.privateKey
          );
        

        const nonce = await web3.eth.getTransactionCount(signer.address, 'latest'); //get latest nonce

        console.log("none:"+ nonce); 
       
        let tokenId  = Number(nonce); 

        let metaDataFileName = 'Nft_#'+String(BigNumber(tokenId).add(1)).padStart(5,"0"); 
        console.log("num:"+ metaDataFileName); 
       
        console.log("date:"+ getDate()); 
        console.log("img:"+ ipfsObj.imgUrl); 
        let metaData  = getNftMintData( metaDataFileName , ipfsObj.imgUrl, 'qverselab test nft', 'quiztok', getDate() , 'qverselab'); 
        console.log(metaData); 
        const jsonDir = "./nft_json/"+metaDataFileName+".json"; 
        let metaFileHash = await addFile(metaDataFileName, jsonDir);
        let tokenURI = "https://{URL}/"+metaFileHash;
        

        const gasLimit = await web3.eth.estimateGas({
            from: signer.address,
            to: signer.address,
        });

       const gasPrice = await web3.eth.getGasPrice();
       //the transaction
       const transactionObject = {
         'from': signer.address,
         'to': CONTRACT_ADDRESS,
         'nonce': nonce,
         'gasPrice': gasPrice, 
         'gasLimit': 3000000 , 
         'data': nftContract.methods.safeMint(wallet.address, tokenURI).encodeABI()
       };
       console.log("tans:"+ transactionObject); 
       const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, '0x'+wallet.privateKey);
       const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
       const hash = transactionReceipt.transactionHash;
       ipfsObj.tx = hash; 
       ipfsObj.code = 200;
    } catch(err){
        ipfsObj.code = 500;
        ipfsObj.msg  = err;
    }
    res.send(ipfsObj); 
 });



router.get('/getTokenList', async (req, res) => { // 토큰 리스트(지갑 기준)

    const nftContract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
    const wallet = generateAccount(req.query.mnemonic);
    const tokenBalance = await nftContract.methods.balanceOf(wallet.address).call();



    let nftArr = []; 
    for(let i = 0; i<tokenBalance; i++){
        const tokenId = await nftContract.methods.tokenOfOwnerByIndex(wallet.address , i).call(); 
        console.log("tokenId:"+ tokenId); 
        const tokenMetadataURI = await nftContract.methods.tokenURI(tokenId).call();

        const tokenMetaData = await fetch(tokenMetadataURI.trim()).then((response) =>  response.json());
        console.log(tokenMetaData); 
        nftArr.push(tokenMetaData); 
    }
    res.send(nftArr); 
});




router.get('/transfer', async (req, res) => { // 소유권 이전 (이체)

    const returnObj = {};
    const nftContract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
    const signer = generateAccount(req.query.mnemonic);

    const nonce = await web3.eth.getTransactionCount(signer.address, 'latest'); //get latest nonce
    const gasLimit = await web3.eth.estimateGas({
        from: signer.address,
        to: req.query.toAddr,
    });

   const gasPrice = await web3.eth.getGasPrice();
   //the transaction
   const transactionObject = {
     'from': signer.address,
     'to': CONTRACT_ADDRESS,
     'nonce': nonce,
     'gasPrice': gasPrice, 
     'gasLimit': 3000000 , 
     'data': nftContract.methods.safeTransferFrom(signer.address,  req.query.toAddr , req.query.tokenId).encodeABI()
   };
   console.log("tans:"+ transactionObject); 
   const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, '0x'+signer.privateKey);
   const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
   const hash = transactionReceipt.transactionHash;
   returnObj.tx = hash;
   res.send(returnObj); 

});



router.get('/getBalance', async (req, res) => { // nft 수량 조회 

    const nftContract = new web3.eth.Contract(abiArray, CONTRACT_ADDRESS);
    const tokenBalance = await nftContract.methods.balanceOf(req.query.address).call();

    const balanceObject = {}; 
    balanceObject.balance = Number(tokenBalance);
    res.send(balanceObject); 

});


