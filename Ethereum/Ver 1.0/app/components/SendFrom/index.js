/**
*
* SendFrom
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import styled from 'styled-components';

const Option = Select.Option;
const Span = styled.span`
  margin-right:10px;
`;


// import styled from 'styled-components';

function SendFrom({ addressList, from, onChangeFrom, locked }) {
  // let options;
  let selectOptions;
  if (addressList && addressList.keySeq().toArray()) {
    // console.log(addressList.keySeq().toArray());

    /* options = addressList.keySeq().toArray().map((address) =>
      <option value={address} key={address}>{address}</option>
    ); */
    selectOptions = addressList.keySeq().toArray().map((address) =>
      <Option value={address} key={address}>{address}</Option>
    );
  }

  return (
    <div>
      <Span>보내는 지갑:</Span>
      <Select value={from} style={{ width: 200 }} onChange={onChangeFrom} disabled={locked}>
        {selectOptions}
      </Select>
    </div >
  );
}

SendFrom.propTypes = {
  from: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onChangeFrom: PropTypes.func,
  addressList: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
    // PropTypes.array,
  ]),
  locked: PropTypes.bool,
};

export default SendFrom;
