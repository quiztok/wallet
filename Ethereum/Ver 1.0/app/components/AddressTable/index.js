/**
*
* AddressTable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table, message , Button } from 'antd';

import CurrencyDropdown from 'components/CurrencyDropdown';
import TokenIcon from 'components/TokenIcon';

import IconButton from 'components/IconButton';

const Img = styled.img`
width: 17px;
line-height: 20px;
`;

function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params;
}
/**
 * Create list of rows, one row per token for given address
 * @param  {object} tokenDecimalsMap
 * @param  {object} tokenMapIN
 * @param  {string} address current address
 * @param  {number} startKey the first key of the given address
 *
 * @return {object[]} array as rows, one row per token/address
 * row:
{
  key: '1',
  index: '1',
  token: 'eth',
  address: '13c...9d06',
  balance: '3',
  convert: '',
} */
const splitAddrToRows = (tokenDecimalsMap, tokenMapIN, address, startKey) => {
  let key = startKey;
  const tokenMap = tokenMapIN;
  const index = tokenMap.index;
  delete tokenMap.index;

  return Object.keys(tokenMap).map((token) => {
    const sameAddressRow = {};
    sameAddressRow.index = index;
    sameAddressRow.key = key;
    key += 1;
    sameAddressRow.token = token;
    sameAddressRow.address = address;
    const balance = tokenMap[token].balance;
    const decimals = tokenDecimalsMap[token];
    sameAddressRow.balance = balance ? balance.div((10 ** decimals).toString()).toString(10) : 'n/a';
    // sameAddressRow.convert = '';
    return sameAddressRow;
  });
};

/**
 * Transforms addressMap into Array of rows
 * @param  {object} addressMap
 * @param  {object} tokenDecimalsMap number of decimal for each currency
 * @param  {boolean} showTokens should show token in the table
 * return example: addressArray =
  [{{
    key: '1',
    index: '1',
    token: 'eth',
    address: '13c...9d06',
    balance: '3',
    convert: '200 USD',
  },
    key: '2',
    index: '1',
    token: 'eos',
    address: '13c...9d06',
    balance: '3',
    convert: '15 USD',
  }, {
    key: '3',
    index: '1',
    token: 'ppt',
    address: '13c...9d06',
    balance: '3',
    convert: '13 USD',
  },
] */
const transformList = (addressMap, tokenDecimalsMap, showTokens) => { //eslint-disable-line
  // const showTokens = true;
  let iKey = 1;
  const list = Object.keys(addressMap).map((address) => {
    const tokenMap = addressMap[address];
    const sameAddressList = splitAddrToRows(tokenDecimalsMap, tokenMap, address, iKey);

    iKey += sameAddressList.length;
    return sameAddressList;
  });
  return [].concat(...list); // flaten array
};

/**
 * return conversion rate from given token
 * @param  {object} exchangeRates available exchange rates
 * @param  {string} from symbol to convert from: 'eth' / 'usd' / ..
 * @param  {string} to the convertion pair to use: ie "eth_usd"
 *
 * @return {Array} array as data for table, see example above
 */
const getConvertRate = (exchangeRates, from, to) => {
  const fromKey = `eth_${from}`;
  // convert token to eth by invert(eth_token)
  const toEthRate = exchangeRates[fromKey].rate.toPower(-1);
  const toTokenRate = exchangeRates[to].rate;
  return toEthRate && toTokenRate && toEthRate.times(toTokenRate);
};

/**
 * Add converted rates to all rows
 * adds nothing if exchange rate not found
 * @param  {object[]} rowList table rows contains balance
 * @param  {object} exchangeRates all available exchange rates
 * @param  {string} convertTo the convertion pair to use: ie "eth_usd"
 *
 * @return {Array} array as data for table, see example above
 */
const addConvertRates = (rowList, exchangeRates, convertTo) =>
  rowList.map((row) => {
    try {
      // const convertToSymbol = convertTo.slice(4).toUpperCase();
      if (`eth_${row.token}` === convertTo) {
        row.convert = row.balance; // eslint-disable-line
      } else {
        const convertRate = getConvertRate(exchangeRates, row.token, convertTo);
        row.convert = convertRate.times(row.balance).round(5).toString(10); // eslint-disable-line
      }
      return row;
    } catch (err) {
      // no rates found
      return row;
    }
  });

function addrView(){
  $(".layer_preview").show();
}

function addrHide(){
  $(".layer_preview").hide();
}
function copyAddress() {
  var copyText = document.getElementById("copyAddrToken");
  copyText.select();
  document.execCommand("Copy");
  message.success('주소 복사가 완료되었습니다.');
}
// 계좌 정보
function AddressTable(props) {
  const {
    addressMap,
    tokenDecimalsMap,
    onShowSendToken,
    exchangeRates,
    onSelectCurrency,
    convertTo,
    checkingBalancesError,
    checkingBalances,
    onCheckBalances,
    networkReady,
    onUnlockWallet, 
  } = props;

  const currencyDropdownProps = { exchangeRates, onSelectCurrency, convertTo };

  const rowList = transformList(addressMap, tokenDecimalsMap, true);
  const completeRowList = addConvertRates(rowList, exchangeRates, convertTo);
  const icon = 'q_icon.png';
  var param = getUrlParams();

  console.log(completeRowList);
  var clipboard = new Clipboard('.copy-letter-button');
  clipboard.on('success', function (e) {
    //console.log(e);
  });
  clipboard.on('error', function (e) {
    console.log(e);
  });      


  return (

        <div className="wallet_area">
            <div className="wallet_tit"><span id="userName"></span>님의 암호화폐</div>

            <div className="wal_box"  >
                <div className="wb_left">
                    <div className="box_tit"><span className="w_logo">
                      <Img src='q_icon.png' /></span><span className="wb_tit">{completeRowList[1].token.toUpperCase()}</span></div>
                    <div className="box_qcash">{completeRowList[1].balance}</div>
                    <div className="box_cash"><span id="qtcon-rate">0</span> KRW</div>
                </div>
                <div className="wb_right">
                    <button type="button" id="tranceQtcn" onClick={() => onShowSendToken(completeRowList[1].address, completeRowList[1].token)} >이체</button>
                </div>
            </div>
            
            <div className="wal_box"  >
                <div className="wb_left">
                    <div className="box_tit"><span className="w_logo">
                      <Img src='eth_icon.png' /></span><span className="wb_tit">{completeRowList[0].token.toUpperCase()}</span></div>
                    <div className="box_qcash">{completeRowList[0].balance}</div>
                    <div className="box_cash" ><span id="eth-rate">0</span> KRW</div>
                </div>
                <div className="wb_right">
                    <button type="button" id="tranceEth" onClick={() => onShowSendToken(completeRowList[0].address, completeRowList[0].token)}>이체</button>
                </div>
            </div>
            <div className="wbox_area">
                <div  className="w_lockbtn">
                  {/* <button type="button"  onClick={onUnlockWallet} ><span><Img src='lock_icon.png' /></span>잠금 해제하기</button> */}
                  <Button icon="lock" id="walletUnLockBtn" type="default" size="large" onClick={onUnlockWallet}>
                    지갑 잠금 해지
                  </Button>
                  
                  </div>
                <div  className="w_refbtn">
                  {/* <button type="button" onClick={onCheckBalances}  error={checkingBalancesError} disabled={!networkReady} popconfirmMsg="지갑 내역을 갱신하시겠습니까?">
                    <span><Img src='re_icon.png' /></span>새로고침
                  </button> */}

                  <IconButton
                      text="지갑 갱신"
                      icon="reload"
                      onClick={onCheckBalances}
                      loading={checkingBalances}
                      error={checkingBalancesError}
                      disabled={!networkReady}
                      // popconfirmMsg="지갑 내역을 갱신하시겠습니까?"
                  />
                </div>
            </div>
            <div className="wbox_area02">
                <button type="button" className="w_addbtn" href="btn_q_preview" onClick={addrView}><span><Img src='wallet_icon.png' /></span>나의 전자지갑 주소</button>
            </div>
            <div className="w_area_bot"><span><Img src='lock_icon.png' /></span>잠금상태를 해제해야만 이체가 가능합니다.</div>


            <div className="layer_preview">
              <div className="inner02">
                  <div className="lpop_tit">나의 전자 지갑 주소</div>
                  <div className="w_myadrs" id="token-addr" ></div>
                  <input type="text" id="copyAddrToken"></input>


                  <div className="w_myad_btn">
                      <button type="button" className="copy-letter-button" data-clipboard-action="copy" data-clipboard-target="#copyAddrToken" > <Img src="link_icon.png"/> 주소복사</button>
                  </div>
                  <div className="w_qrimg" id="token-qr"></div>
                <button type="button" className="btn_pre_close02" onClick={addrHide}>닫기</button>
              </div>
              <div className="layer_quiz_mask"></div>
          </div> 
        </div>
       

  );
}

AddressTable.propTypes = {
  addressMap: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tokenDecimalsMap: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onShowSendToken: PropTypes.func,
  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onCheckBalances: PropTypes.func,
  networkReady: PropTypes.bool,
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,

};

export default AddressTable;
