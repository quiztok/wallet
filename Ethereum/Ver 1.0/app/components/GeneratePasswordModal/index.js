/**
*
* GeneratePasswordModal
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

function GeneratePasswordModal(props) {
  const {
    isShowGeneratePassword, 
    isShowGenerateWallet,
    generateWalletLoading,
    // generateWalletError,
    seed,
    password,
    onChangeUserPassword , 
    onGenerateWallet,
    onGeneratePassword,
    onGenerateWalletCancel,
    onGenerateKeystore,
    onUserPasswordChange ,
    onGeneratePasswordCancel,

    
    } = props;
  return (
    <Modal
      visible={isShowGeneratePassword}
      title="지갑 생성 (1 단계)"
      onOk={onGeneratePasswordCancel}
      onCancel={onGeneratePasswordCancel}
      footer={[
        <Button key="submit" type="primary" id="generate_keystore" size="large" onClick={onGenerateWallet} >
          다음 
        </Button>,
      ]}
    >
      <Alert
        message={<b>개인키를 잃어버린 경우 지갑 복구를 할 수 없습니다.</b>}
        description={<b> 비밀번호는 대, 소문자 구분되며 특수문자 포함된 9자리 이상을 입력합니다.<br/> 비밀번호를 분실한 경우 복구할 수 없으므로 꼭 기억하시길 바랍니다.</b>} // eslint-disable-line
        type="warning"
        showIcon
      />

      <br />
      <Div>
        <Input
          placeholder="비밀번호를 입력하세요."
          type="password"
          id="password"
          prefix={<Icon type="key" />}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </Div>      
      <Div>
        <Input
          placeholder="비밀번호 확인 : 비밀번호를 입력하세요."
          prefix={<Icon type="key" />}
          type="password"
          id="passwordCheck"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={onChangeUserPassword}
          spellCheck={false}
        />
        <Input
          type="hidden"
          id="passwordCheckStatus"
          value="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />        
      </Div>      
      <br/>
      <Button type="primary" size="large" onClick={passwordCheckd}>
          비밀번호 확인 
        </Button>

    </Modal>
    
  );
  function passwordCheckd(){
    //console.log("pw value:"+document.getElementById("password").value);
    var pw = document.getElementById("password");
    var pwCheck = document.getElementById("passwordCheck");

    if (pw.value ==""){
      pw.focus();
      alert("비밀번호를 입력하십시오.");
      return false;
    }
    

    if (pwCheck.value ==""){
      pwCheck.focus();
      alert("비밀번호 확인부탁드립니다.");
      return false;
    }

    if(pw.value.length <=8){
      $("#password").val("");
      $("#password").focus();
      alert("비밀번호는 최소 8자 이상 입력하십시오.");
      return false;
    }

    if (pw.value!=pwCheck.value) {
      $("#password").val("");
      $("#passwordCheck").val();
      $("#password").focus();
      alert("입력하신 비밀번호가 일치하지 않습니다.");
      return false;

    }

    if(pw.value == pwCheck.value) {
      console.log("pw checked:"+ "T");
      //document.getElementById("generate_keystore").disabled = false;
      document.getElementById("passwordCheckStatus").value = "true";
      //GenerateWalletModal.propTypes.password = pw;
      document.getElementById("userPasswords").value = pw.value;
      document.getElementById("userPassStatus").value = "true";
      //$("#password").val("");
      //$("#passwordCheck").val("");
      alert("다음 버튼을 눌러주십시오.");

  
    } else {
      console.log("pw checked:"+ "F");
      document.getElementById("passwordCheckStatus").value = "false";
    }

  }
  
}
GeneratePasswordModal.propTypes = {
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
  onGeneratePasswordCancel :PropTypes.func,

};


export default GeneratePasswordModal;
