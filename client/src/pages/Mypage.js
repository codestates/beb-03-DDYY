import React from "react";
import CardList from "../components/CardList";

const Mypage = () => {
  return (
    <div className="mypage">
      <div className="mypage-text-wrapper">
        Your NFTs...
      </div>
      <CardList />
    </div>
  )
}

export default Mypage;