/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

/* Components:  */
import AddressView from 'components/AddressView';
import SendToken from 'containers/SendToken';
import TokenChooser from 'containers/TokenChooser';
import GenerateWalletModal from 'components/GenerateWalletModal';
import GeneratePasswordModal from 'components/GeneratePasswordModal';
import RestoreWalletModal from 'components/RestoreWalletModal';
import SubHeader from 'components/SubHeader';
//import PageFooter from 'components/PageFooter';
//import { Content } from 'components/PageFooter/sticky';

import PageFooter from 'components/MobilePageFooter';
import { Content } from 'components/MobilePageFooter/sticky';


import WalletArea from 'components/WalletArea';

/* Header: */
// import Header from 'containers/Header';
// import { loadNetwork, checkBalances, getExchangeRates } from 'containers/Header/actions';
import Header from 'containers/MobileHeader';
import { loadNetwork, checkBalances, getExchangeRates } from 'containers/Header/actions';

import {
  makeSelectNetworkReady,
  makeSelectCheckingBalanceDoneTime,
  makeSelectCheckingBalances,
  makeSelectCheckingBalancesError,
  makeSelectGetExchangeRatesDoneTime,
  makeSelectGetExchangeRatesLoading,
  makeSelectGetExchangeRatesError,
} from 'containers/Header/selectors';

/* General */
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';


/* HomePage */
import {
  generateWallet,
  generatePassword,
  generatePasswordCancel,
  generateWalletCancel,
  showRestoreWallet,
  restoreWalletCancel,
  generateKeystore,
  changeUserSeed,
  changeUserPassword,
  restoreWalletFromSeed,
  showSendToken,
  hideSendToken,
  showTokenChooser,
  hideTokenChooser,
  generateAddress,
  lockWallet,
  unlockWallet,
  selectCurrency,
  closeWallet,
  saveWallet,
  loadWallet,
} from './actions';

import {
  makeSelectIsShowGeneratePassword, 
  makeSelectIsShowGenerateWallet,
  makeSelectGenerateWalletLoading,
  makeSelectGenerateWalletError,
  makeSelectSeed,
  makeSelectGenerateKeystoreLoading,
  makeSelectGenerateKeystoreError,
  makeSelectRestoreWalletError,
  makeSelectPassword,
  makeSelectIsComfirmed,
  makeSelectUserSeed,
  makeSelectUserPassword,
  makeSelectAddressMap,
  makeSelectShowRestoreWallet,
  makeSelectIsShowSendToken,
  makeSelectIsShowTokenChooser,
  makeSelectAddressListLoading,
  makeSelectAddressListError,
  makeSelectAddressListMsg,
  makeSelectExchangeRates,
  makeSelectConvertTo,
  makeSelectSaveWalletLoading,
  makeSelectSaveWalletError,
  makeSelectLoadWalletLoading,
  makeSelectLoadwalletError,
  makeSelectTokenDecimalsMap,
} from './selectors';
import MobileHeader from '../MobileHeader';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onLoadWallet();
  }

  render() {
    const {
      onGenerateWallet,
      onGeneratePassword,
      onGeneratePasswordCancel,
      onGenerateWalletCancel,
      isShowGeneratePassword, 
      isShowGenerateWallet,
      generateWalletLoading,
      generateWalletError,

      generateKeystoreLoading,
      generateKeystoreError,
      seed,
      password,
      restoreWalletError,
      onGenerateKeystore,
      onGenerateAddress,
      onCheckBalances,
      isComfirmed,
      // addressList,
      addressMap,
      tokenDecimalsMap,

      onShowRestoreWallet,
      isShowRestoreWallet,
      userSeed,
      userPassword,
      onChangeUserSeed,
      onChangeUserPassword,
      onRestoreWalletFromSeed,
      onRestoreWalletCancel,

      isShowSendToken,
      onShowSendToken,
      onHideSendToken,
      onShowTokenChooser,
      onHideTokenChooser,

      isShowTokenChooser,

      addressListLoading,
      addressListError,
      addressListMsg,

      networkReady,
      checkingBalanceDoneTime,
      checkingBalances,
      checkingBalancesError,

      onLockWallet,
      onUnlockWallet,

      exchangeRates,
      onSelectCurrency,
      convertTo,

      onGetExchangeRates,
      getExchangeRatesDoneTime,
      getExchangeRatesLoading,
      getExchangeRatesError,
      onCloseWallet,

      onSaveWallet,
      saveWalletLoading,
      saveWalletError,
      onLoadWallet,
      loadWalletLoading,
      loadWalletError,
      onUserPasswordChange,
    } = this.props;

    const subHeaderProps = {
      onGeneratePassword,
      onGeneratePasswordCancel,
      onGenerateWallet,
      isShowGeneratePassword,
      onGeneratePassword,
      onShowRestoreWallet,
      isComfirmed,
      onCloseWallet,
      onLockWallet,
      password,
      onUnlockWallet,

      onSaveWallet,
      saveWalletLoading,
      saveWalletError,
      onLoadWallet,
      onUserPasswordChange,
      loadWalletLoading,
      loadWalletError,
    };

    const WalletAreaProps = {
      onGeneratePassword,
      onGeneratePasswordCancel,
      onGenerateWallet,
      isShowGeneratePassword,
      onGeneratePassword,
      onShowRestoreWallet,
      isComfirmed,
      onCloseWallet,
      onLockWallet,
      password,
      onUnlockWallet,

      onSaveWallet,
      saveWalletLoading,
      saveWalletError,
      onLoadWallet,
      onUserPasswordChange,
      loadWalletLoading,
      loadWalletError,
    };

    const generateWalletProps = {
      isShowGenerateWallet,
      isShowGeneratePassword,
      generateWalletLoading,
      generateWalletError,
      seed,
      password,
      onGenerateWallet,
      onGenerateWalletCancel,
      onGeneratePasswordCancel,
      
      onGenerateKeystore,
      onUserPasswordChange , 
      onGeneratePasswordCancel,
    };

    const generatePasswordProps = {
      isShowGenerateWallet,
      isShowGeneratePassword, 
      generateWalletLoading,
      generateWalletError,
      seed,
      password,
      onGenerateWallet,
      onGenerateWalletCancel,
      onGenerateKeystore,
      onUserPasswordChange , 
      onGeneratePasswordCancel,
      
    };     
    const restoreWalletModalProps = {
      isShowRestoreWallet,
      userSeed,
      userPassword,
      restoreWalletError,
      onChangeUserSeed,
      onChangeUserPassword,
      onRestoreWalletCancel,
      onRestoreWalletFromSeed,
      onUserPasswordChange,
      onGeneratePasswordCancel,
    };

    const addressViewProps = {
      generateKeystoreLoading,
      generateKeystoreError,
      isComfirmed,
      // addressList,
      addressMap,
      tokenDecimalsMap,

      onShowSendToken,
      onShowTokenChooser,

      onCheckBalances,
      onGenerateAddress,
      addressListLoading,
      addressListError,
      addressListMsg,
      networkReady,
      checkingBalanceDoneTime,
      checkingBalances,
      checkingBalancesError,
      onSelectCurrency,
      exchangeRates,
      convertTo,
      onGetExchangeRates,
      getExchangeRatesDoneTime,
      getExchangeRatesLoading,
      getExchangeRatesError,
      onUserPasswordChange,
      onGeneratePasswordCancel,
      onUnlockWallet , 

    };

    const sendTokenProps = { isShowSendToken, onHideSendToken, onUserPasswordChange , onUnlockWallet  };
    const tokenChooserProps = { isShowTokenChooser, onHideTokenChooser , onUserPasswordChange };
    const footerProps = {     
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
      onUnlockWallet,  };

    return (
      // <div>
      //   <Content>
      //     <Header />
      //     <SubHeader {...subHeaderProps} />
      //     <GeneratePasswordModal {...generatePasswordProps} />
      //     <GenerateWalletModal {...generateWalletProps} />
      //     <RestoreWalletModal {...restoreWalletModalProps} />
      //     <AddressView {...addressViewProps} />
      //     <SendToken {...sendTokenProps} />
      //     <TokenChooser {...tokenChooserProps} />
      //   </Content>
      //   <PageFooter />
      // </div>
      <div>
        <Content>
          <div id="quizArea" className="area" >
            <div className="document page-chat page-ch">
              <Header />
              <WalletArea {...WalletAreaProps} /> 
              <GeneratePasswordModal {...generatePasswordProps} />
              <GenerateWalletModal {...generateWalletProps} />
              <RestoreWalletModal {...restoreWalletModalProps} />
              <AddressView {...addressViewProps} />
              <SendToken {...sendTokenProps} />
              <TokenChooser {...tokenChooserProps} />
              {/* <PageFooter {...footerProps} /> */}
            </div>
          </div>
        </Content>

      </div>         
    );
  }
}

HomePage.propTypes = {

  onGenerateWallet: PropTypes.func,
  onGeneratePassword : PropTypes.func,
  onGeneratePasswordCancel : PropTypes.func,
  onGenerateWalletCancel: PropTypes.func,
  isShowGeneratePassword: PropTypes.bool,
  isShowGenerateWallet: PropTypes.bool,
  generateWalletLoading: PropTypes.bool,
  generateWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onUserPasswordChange :PropTypes.func,
  seed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  password: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),

  generateKeystoreLoading: PropTypes.bool,
  generateKeystoreError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),

  // onInitSeed: PropTypes.func,
  onGenerateKeystore: PropTypes.func,
  onGenerateAddress: PropTypes.func,
  onShowRestoreWallet: PropTypes.func,

  isShowRestoreWallet: PropTypes.bool,
  userSeed: PropTypes.string,
  userPassword: PropTypes.string,
  onChangeUserSeed: PropTypes.func,
  onChangeUserPassword: PropTypes.func,
  restoreWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onRestoreWalletFromSeed: PropTypes.func,
  onRestoreWalletCancel: PropTypes.func,

  onCheckBalances: PropTypes.func,

  onLockWallet: PropTypes.func,
  onUnlockWallet: PropTypes.func,

  isComfirmed: PropTypes.bool,
  addressMap: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]),
  tokenDecimalsMap: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),

  isShowSendToken: PropTypes.bool,
  onShowSendToken: PropTypes.func,
  onHideSendToken: PropTypes.func,

  isShowTokenChooser: PropTypes.bool,
  onShowTokenChooser: PropTypes.func,
  onHideTokenChooser: PropTypes.func,

  addressListLoading: PropTypes.bool,
  addressListError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  addressListMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  networkReady: PropTypes.bool,
  checkingBalanceDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checkingBalances: PropTypes.bool,
  checkingBalancesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),

  exchangeRates: PropTypes.object,
  onSelectCurrency: PropTypes.func,
  convertTo: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onGetExchangeRates: PropTypes.func,
  getExchangeRatesDoneTime: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  getExchangeRatesLoading: PropTypes.bool,
  getExchangeRatesError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  onCloseWallet: PropTypes.func,

  onSaveWallet: PropTypes.func,
  saveWalletLoading: PropTypes.bool,
  saveWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
  onLoadWallet: PropTypes.func,
  onUserPasswordChange : PropTypes.func,
  loadWalletLoading: PropTypes.bool,
  loadWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
};

export function mapDispatchToProps(dispatch) {
  return {
    onGeneratePassword: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generatePassword());
    },    
    onGeneratePasswordCancel: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generatePasswordCancel());
    },

    onGenerateWallet: (evt) => {
            
      var pwCheck = document.getElementById("userPassStatus").value;
      if (pwCheck =="true"){
        if (evt !== undefined && evt.preventDefault) evt.preventDefault();
        dispatch(generateWallet());
      } else {
        document.getElementById("password").focus();
        alert("비밀번호 확인을 먼저 하십시오.");
          
      }

    },
    onGenerateWalletCancel: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateWalletCancel());
    },
    onGenerateKeystore: (evt) => {
      var pw = ( typeof document.getElementById("password") === 'object' )?document.getElementById("password"):'';        
      
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateKeystore());

//      dispatch(changeUserPassword(pw.value));
//      console.log("changed ");
      
      
    },
    onGenerateAddress: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(generateAddress());
    },
    onLoadNetwork: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadNetwork('local'));
    },
    onShowRestoreWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(showRestoreWallet());
    },
    onRestoreWalletCancel: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(restoreWalletCancel());
    },
    onChangeUserSeed: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // console.log(evt.target);
      dispatch(changeUserSeed(evt.target.value));
    },
    onChangeUserPassword: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      // console.log(evt.target);
      //dispatch(changeUserPassword(evt.target.value));
      dispatch(changeUserPassword(evt.target.value));
    },
    onRestoreWalletFromSeed: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(restoreWalletFromSeed());
    },
    onCheckBalances: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(checkBalances());
    },
    onShowSendToken: (address, tokenSymbol) => {
      dispatch(showSendToken(address, tokenSymbol));
    },
    onHideSendToken: () => {
      dispatch(hideSendToken());
    },
    onShowTokenChooser: () => {
      dispatch(showTokenChooser());
    },
    onHideTokenChooser: () => {
      dispatch(hideTokenChooser());
    },
    onLockWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(lockWallet());
    },
    onUnlockWallet: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(unlockWallet());
    },
    onSelectCurrency: (convertTo) => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(selectCurrency(convertTo));
    },
    onGetExchangeRates: () => {
      // if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(getExchangeRates());
    },
    onCloseWallet: () => {
      dispatch(closeWallet());
    },
    onSaveWallet: () => {
      dispatch(saveWallet());
    },
    onLoadWallet: () => {
      dispatch(loadWallet());
    },
    onUserPasswordChange: () => {
      console.log("user password change!!!");
      //dispatch(userPasswordChange("user password change!!!"));
    },
  };
}

const mapStateToProps = createStructuredSelector({

  isShowGeneratePassword :makeSelectIsShowGeneratePassword(), 
  isShowGenerateWallet: makeSelectIsShowGenerateWallet(),
  generateWalletLoading: makeSelectGenerateWalletLoading(),
  generateWalletError: makeSelectGenerateWalletError(),
  seed: makeSelectSeed(),
  password: makeSelectPassword(),

  generateKeystoreLoading: makeSelectGenerateKeystoreLoading(),
  generateKeystoreError: makeSelectGenerateKeystoreError(),
  restoreWalletError: makeSelectRestoreWalletError(),
  isComfirmed: makeSelectIsComfirmed(),
  // addressList: makeSelectAddressList(),
  addressMap: makeSelectAddressMap(),
  tokenDecimalsMap: makeSelectTokenDecimalsMap(),
  // keystore: makeSelectKeystore(),
  isShowRestoreWallet: makeSelectShowRestoreWallet(),
  userSeed: makeSelectUserSeed(),
  userPassword: makeSelectUserPassword(),

  isShowSendToken: makeSelectIsShowSendToken(),
  isShowTokenChooser: makeSelectIsShowTokenChooser(),

  addressListLoading: makeSelectAddressListLoading(),
  addressListError: makeSelectAddressListError(),
  addressListMsg: makeSelectAddressListMsg(),

  networkReady: makeSelectNetworkReady(),
  checkingBalanceDoneTime: makeSelectCheckingBalanceDoneTime(),
  checkingBalances: makeSelectCheckingBalances(),
  checkingBalancesError: makeSelectCheckingBalancesError(),

  // exchangeRates: makeSelectExchangeRates(),
  exchangeRates: makeSelectExchangeRates(),
  convertTo: makeSelectConvertTo(),

  getExchangeRatesDoneTime: makeSelectGetExchangeRatesDoneTime(),
  getExchangeRatesLoading: makeSelectGetExchangeRatesLoading(),
  getExchangeRatesError: makeSelectGetExchangeRatesError(),

  saveWalletLoading: makeSelectSaveWalletLoading(),
  saveWalletError: makeSelectSaveWalletError(),
  loadWalletLoading: makeSelectLoadWalletLoading(),
  loadWalletError: makeSelectLoadwalletError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });



export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
