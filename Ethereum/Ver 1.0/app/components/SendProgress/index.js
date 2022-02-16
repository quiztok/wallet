/**
*
* SendProgress
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Spin } from 'antd';
import styled from 'styled-components';
import TxLink from 'components/TxLink';

const Span = styled.span`
  overflow-wrap: break-word;
`;

function SendProgress({ sendInProgress, sendError, sendTx, txExplorer }) {
  if (sendInProgress) {
    return (
      <Spin
        spinning
        style={{ position: 'static' }}
        size="large"
        tip="Sending..."
      >
        <br /><br />
      </Spin>

    );
  }

  if (sendError !== false) {
    return (
      <Alert
        message="이체 오류"
        description="지갑 잠금 해지 버튼을 통해서 비밀번호를 입력하십시오."
        type="error"
      />
    );
  }

  if (sendTx) {
    return (
      <Alert
        message="전송 성공"
        description={<Span> TX: <br /> <TxLink tx={sendTx} explorer={txExplorer} /> </Span>}
        type="success"
      />
    );
  }

  return null;
}

SendProgress.propTypes = {
  sendInProgress: PropTypes.oneOfType([PropTypes.bool]),
  sendError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sendTx: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  txExplorer: PropTypes.string,
};

export default SendProgress;
