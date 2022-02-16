/**
*
* WalletArea
*
*/

import React from 'react';
import { Button, Popconfirm , Input } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LockButton from 'components/LockButton';
import IconButton from 'components/IconButton';
const Div = styled.div`
  .ant-btn {
  margin-right: 8px;
    }
    text-align:center;
  .anticon-lock {
    color: red;
  }
  .anticon-unlock {
    color: blue;
  }
`;
const P = styled.p`margin-top:200px;`;


function WalletArea(props) {
  const {
    onGenerateWallet, onShowRestoreWallet, isComfirmed, onCloseWallet,
    onLockWallet, password, onUnlockWallet, onGeneratePassword , 
    /* optional laod / save buttons
     onSaveWallet, saveWalletLoading, saveWalletError,
     onLoadWallet, loadWalletLoading, loadWalletError, */
  } = props;

  const lockButtonProps = { onLockWallet, password, onUnlockWallet };

  const noWallet = [
    //  <Button key="new_wallet" type="primary" size="large" onClick={onGenerateWallet}>
    //    지갑 생성
    //  </Button>,
    <P key="margins"/>,
    <Button key="new_wallet" type="primary" size="large" onClick={onGeneratePassword}>
      지갑 생성
    </Button>,
    <Button key="restore_wallet" type="default" size="large" onClick={onShowRestoreWallet}>
      지갑 복구
    </Button>,
    <Input
    type="hidden"
    key="pw"
    id="userPasswords"
    value=""
    />,
    <Input
    type="hidden"
    key="pw_status"
    id="userPassStatus"
    value="false"
    />
    
    /* optional laod / save buttons
     <IconButton
      key="load"
      text="Load from storage"
      icon="upload"
      onClick={onLoadWallet}
      loading={loadWalletLoading}
      error={loadWalletError}
    />,*/
  ];

  const existingWallet = [
  ];
  const WalletArea = isComfirmed ? existingWallet : noWallet;

  return (
    
    <Div>
      {WalletArea}
    </Div>
  );
}

WalletArea.propTypes = {
  onGenerateWallet: PropTypes.func,
  onGeneratePassword : PropTypes.func,
  onShowRestoreWallet: PropTypes.func,
  isComfirmed: PropTypes.bool,
  onCloseWallet: PropTypes.func,
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
  /* optional laod / save buttons
  onSaveWallet: PropTypes.func,
  saveWalletLoading: PropTypes.bool,
  saveWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
   onLoadWallet: PropTypes.func,
  loadWalletLoading: PropTypes.bool,
  loadWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]), */
};

export default WalletArea;
