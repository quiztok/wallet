/**
*
* SendAmount
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import styled from 'styled-components';
const Span2 = styled.span`
  margin-right:56px;
`;

function SendAmount({ amount, onChangeAmount, locked }) {
  return (
    <span>
      {'수량: '}
      <Span2></Span2>
      <InputNumber
        value={amount}
        min={0}
        step={0.1}
        onChange={(value) => onChangeAmount((value))}
        disabled={locked}
      />
    </span>
  );
}

SendAmount.propTypes = {
  amount: PropTypes.number,
  onChangeAmount: PropTypes.func,
  locked: PropTypes.bool,
};

export default SendAmount;
