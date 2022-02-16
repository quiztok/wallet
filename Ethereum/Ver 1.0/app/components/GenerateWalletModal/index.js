/**
*
* GenerateWalletModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Button, Input, Icon, Tooltip , Alert } from 'antd';




const Div = styled.div`
  margin-top: 12px;
`;
const Span = styled.span`
  color: red;
  font-size: 21px;
  padding-right: 12px;
  vertical-align: sub;
`;

const Description = styled.div`
  margin-bottom: 10px;
`;
var s = null;

function GenerateWalletModal(props) {
  const {
    isShowGenerateWallet,
    generateWalletLoading,
    // generateWalletError,
    seed,
    password,
    onChangeUserPassword , 
    onGenerateWallet,
    onGenerateWalletCancel,
    onGenerateKeystore,
    onUserPasswordChange ,

    
    } = props;
//    s = props.seed;
    //console.log("pass1: "+password);
  return (
    <Modal
      visible={isShowGenerateWallet}
      title="지갑 생성 (2 단계)"
      onOk={onGenerateKeystore}
      onCancel={onGenerateWalletCancel}
      footer={[
        <Button key="submit" type="primary" id="generate_keystore" size="large" onClick={onGenerateKeystore} data-checke >
          지갑 생성
        </Button>,
      ]}
    >
      <Alert
        message={<b>개인키를 잃어버린 경우 지갑 복구를 할 수 없습니다.</b>}
        description={<b> 다음의 개인키를 분실한 경우 지갑 복구가 불가능합니다.<br/> 개인키를 꼭 보관하십시오.<br/> 지갑 생성 가입 시 제출된 이메일로 개인키가 보내집니다. </b>} // eslint-disable-line
        type="warning"
        showIcon

      />
      <br />
      <Alert
        message="개인 키:"
        description={<b>{seed}</b>}
        type="info"
      />
    
      <br />
    </Modal>
  
  );
  
}
GenerateWalletModal.propTypes = {
  isShowGenerateWallet: PropTypes.bool,
  generateWalletLoading: PropTypes.bool,
  /* generateWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]), */
  seed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  password: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChangeUserPassword:PropTypes.func, 
  
  onGenerateWallet: PropTypes.func,
  onGenerateWalletCancel: PropTypes.func,
  onGenerateKeystore: PropTypes.func,
  onUserPasswordChange :PropTypes.func,

};


export default GenerateWalletModal;
