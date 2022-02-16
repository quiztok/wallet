/**
*
* PageFooter
*
*/

import React from 'react';
import { github } from 'utils/constants';
import { Modal, Row, Col } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { StickyFooter } from './sticky';

import {
  GENERATE_PASSWORD, 
  GENERATE_PASSWORD_CANCEL,
  GENERATE_WALLET,
  GENERATE_WALLET_SUCCESS,
  GENERATE_WALLET_ERROR,
  GENERATE_WALLET_CANCEL,

  GENERATE_KEYSTORE,
  GENERATE_KEYSTORE_SUCCESS,
  GENERATE_KEYSTORE_ERROR,

  SHOW_RESTORE_WALLET,
  RESTORE_WALLET_CANCEL,
  CHANGE_USER_SEED,
  CHANGE_USER_PASSWORD,
  RESTORE_WALLET_FROM_SEED,
  RESTORE_WALLET_FROM_SEED_SUCCESS,
  RESTORE_WALLET_FROM_SEED_ERROR,

  CHANGE_BALANCE,

  SHOW_SEND_TOKEN,
  HIDE_SEND_TOKEN,
  SHOW_TOKEN_CHOOSER,
  HIDE_TOKEN_CHOOSER,

  UPDATE_TOKEN_INFO,

  GENERATE_ADDRESS,
  GENERATE_ADDRESS_SUCCESS,
  GENERATE_ADDRESS_ERROR,

  LOCK_WALLET,
  UNLOCK_WALLET,
  UNLOCK_WALLET_SUCCESS,
  UNLOCK_WALLET_ERROR,

  SET_EXCHANGE_RATES,
  SELECT_CURRENCY,

  CLOSE_WALLET,

  CHECK_LOCAL_STORAGE,
  LOCAL_STORAGE_EXIST,
  LOCAL_STORAGE_NOT_EXIST,

  SAVE_WALLET,
  SAVE_WALLET_SUCCESS,
  SAVE_WALLET_ERROR,

  LOAD_WALLET,
  LOAD_WALLET_SUCCESS,
  LOAD_WALLET_ERROR,
} from './constants';


const Footer = StickyFooter.extend`
  textAlign: center;
  background: #efeeee;
  color: #5a5a5a;
  padding: 10px;
  font-size: 14px;
`;

const Span = styled.span`

`;
const Div = styled.div`
  display: block;
`;
const a = styled.a``;
const i = styled.i``;


function PageFooter(props) {
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
   
     // if($("#tranceQtcn").length > 0) {
    //onShowSendToken("0x75f4c81bae7adc6818d116270e1bbe2628a71d03","Qtcon");
  // }
  

   

  return (
      <Div id="footer">
        <Div className="nav-foot">
          <a><i className="icon-bar-bot"></i><Span>큐봇</Span></a>
          <a><i className="icon-bar-nsec"></i><Span>N초퀴즈</Span></a> 
          <a><i className="icon-bar-channel"></i><Span>채널</Span></a> 
          <a><i className="icon-bar-quiz active"></i><Span className="eng">MYQ</Span></a> 
          <a><i className="icon-bar-point"></i><Span>포인트</Span></a> 
        </Div>
      </Div>
   );
}

PageFooter.propTypes = {
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

export default PageFooter;
