import React, { useEffect, useState } from "react";
import CardList from "../components/CardList";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator";

const Mypage = ({account}) => {

  const [myNFTs, setMyNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const myAccount = account[0];

  // Axios 통신으로 NFT 목록 가져오기
  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/account/getNfts?address=${myAccount}`)
    .then((response) => {
      const result = [];
      let count = 0;
      response.data.result.map((item) => {
        const parsedItem = JSON.parse(item.metadata);
        const info = {
          id: count,
          name: parsedItem.name ? parsedItem.name : 'undefined',
          desc: parsedItem.description ? parsedItem.description : 'undefined',
          url: parsedItem.image ? parsedItem.image : null,
        }
        result.push(info);
        count++;
      });
      setMyNFTs(result);
      setIsLoading(false);
    })
    .catch((error) => console.log('error', error));
  }, [])

  return (
    <div className="mypage">
      <div className="mypage-text-wrapper">
        Your NFTs...
      </div>
      {
        isLoading ?
        <LoadingIndicator /> :
        <CardList NFTList={myNFTs} isMypage={true} />
      }
    </div>
  )
}

export default Mypage;