import React from "react";
import { useParams } from "react-router-dom";
import TokenInfo from '../components/TokenInfo';

const Token = () => {

  const {tokenId} = useParams();

  return (
    // state : token 정보, 로그인된 지갑 계정 소유 토큰인지?
    <div className="token">
      <div className="token-text-wrapper">
        Detail Infomations
      </div>
      <TokenInfo />
    </div>
  )
}

export default Token;