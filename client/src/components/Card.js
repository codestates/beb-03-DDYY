import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = () => {
  return (
    <div className="card">
      <div className="card-img-wrapper">
      </div>
      <div className="card-text-wrapper">
        <div className="card-name-desc">
          <div className="card-textbox">
            <div className="card-textbox-title">Name</div>
            <div className="card-textbox-content">myNFT</div>
          </div>
          <div className="card-textbox">
            <div className="card-textbox-title">Description</div>
            <div className="card-textbox-content">cute NFT</div>
          </div>
        </div>
        <div className="card-price-button">
          <div className="card-price">0.01 ETH</div>
          <button>BUY</button>
        </div>
      </div>
    </div>
  )
}

export default Card;