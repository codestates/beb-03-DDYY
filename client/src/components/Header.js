import React from "react";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header-wrapper">
      <span className="ddyy">
        <Link to='/'>DDYY</Link>
      </span>
      <div className="menu-wrapper">
        <div><Link to='/explore'>explore</Link></div>
        <div><Link to='/create'>create</Link></div>
        <div><Link to='/mypage'>mypage</Link></div>
        {/* <div><FontAwesomeIcon icon={faWallet} /></div> */}
      </div>
    </div>
  )
}

export default Header;