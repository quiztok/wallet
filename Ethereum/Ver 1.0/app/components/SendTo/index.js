/**
*
* SendTo
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon , Button } from 'antd';
import styled from 'styled-components';
import { equal } from 'assert';
const Span = styled.span`
  margin-right:10px;
`;

function qrCodeScan(){
  console.log("qr://reader/"+$(".ant-select-selection-selected-value").eq(1).attr("title"));
    $(location).attr("href","qr://reader/"+$(".ant-select-selection-selected-value").eq(1).attr("title"));
}

function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params;
}

function SendTo({ to, onChangeTo, locked }) {
  var param = getUrlParams();

  return (
    <div>
      <Span>받는 분 지갑:</Span>
      <Input
        style={{ width: 116 }} 
        id="toAddressInput"
        placeholder="받는 분 지갑 주소를 입력하십시오."
        prefix={<Icon type="contacts" />}
        onChange={onChangeTo}
        disabled={locked}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
        <Button onClick={qrCodeScan} style={{ marginLeft: 5 }} >
          QR 코드
        </Button>      
    </div>
  );
}

SendTo.propTypes = {
  to: PropTypes.string,
  onChangeTo: PropTypes.func,
  locked: PropTypes.bool,
};

export default SendTo;
