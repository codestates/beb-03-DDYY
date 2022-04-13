import React, { Component, useEffect, useState } from "react";
import getWeb3 from "../getWeb3";
import CardList from "../components/CardList";
import Token from "./Token";
import axios from "axios";

const Mypage = ({account}) => {

  const [myNFTs, setMyNFTs] = useState([]);

  const myAccount = account[0];

  // Axios 통신으로 NFT 목록 가져오기
  useEffect(() => {
    axios.get(`http://localhost:8080/account/getNfts?address=${myAccount}`)
    .then((response) => response.data.result)
    .then((result) => console.log(result));
  }, [])

  return (
    <div className="mypage">
      <div className="mypage-text-wrapper">
        Your NFTs...
      </div>
      {/* <CardList NFTList={myNFTs} isMypage={true} /> */}
    </div>
  )
}

export default Mypage;