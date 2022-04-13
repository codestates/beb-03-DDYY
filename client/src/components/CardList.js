import React from "react";
import Card from './Card';

const CardList = ({ NFTList, isMypage }) => {
  return (
    <div className="card-container">
      {
        NFTList.map((item) => {
          return (
            <div key={item.id} className="card-wrapper"><Card name={item.name} desc={item.desc} url={item.url} isMypage={isMypage} /></div>
          )
        })
      }
  </div>
  )
}

export default CardList;