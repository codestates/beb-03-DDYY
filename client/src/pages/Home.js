import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className='home'>
      <div className='home-content'>
        <div className='cart-wrapper'>
          <span>
          <FontAwesomeIcon icon={faCartShopping} /><br />
          </span>
        </div>
        WELCOM!<br />
        DDYY NFT MARKET.
      </div>
    </div>
  )
}

export default Home;