import React from "react";
import Card from './Card';

const CardList = ({ NFTList, isMypage, myAccount }) => {
  return (
    <div className="card-container">
      {
        NFTList.map((item) => {
          return (
            <div key={item.id} className="card-wrapper"><Card name={item.name} desc={item.desc} url={item.url} id={item.id} isMypage={isMypage} myAccount={myAccount} /></div>
          )
        })
      }
  </div>
  )
}

export default CardList;