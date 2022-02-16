/**
*
* WelcomeText
*
*/

import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 22px;
  color: rgba(0, 0, 0, 0.55);
  font-weight: 400;
  text-align:center;
  font-family:"Noto Sans KR", "Malgun Gothic", "���� ����", dotum, ����, sans-serif;
  margin-top:20px;
`;

const H2 = styled.h2`
font-size: 16px;
margin-top:30px;
color: #b9b9b9;
font-weight: 400;

`;

function WelcomeText() {
  return (
    <div>
      <H1> 환영합니다. QTCON Wallet입니다.</H1>
    </div>
  );
}

WelcomeText.propTypes = {

};

export default WelcomeText;
