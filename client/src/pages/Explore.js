import React from "react";
import CardList from '../components/CardList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Explore = () => {
  return (
    <div className="explore">
      <div className="explore-searchbox">
        <input type="text" placeholder="search.." />
        <span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>
      <CardList />
    </div>
  )
}

export default Explore;