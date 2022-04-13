import React, { useEffect, useRef, useState } from "react";
import CardList from '../components/CardList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import LoadingIndicator from "../components/LoadingIndicator";

const Explore = () => {
  const [NFTList, setNFTList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isLessThan3, setIsLessThan3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    let url;
    if (keyword === '') {
      url = "http://localhost:8080/ether/getNftLists?name=cat";
    } else {
      url = `http://localhost:8080/ether/getNftLists?name=${keyword}`;
    };
    setIsLoading(true);
    axios.get(url)
    .then((response) => {
      // console.log('⭐️⭐️⭐️----------------', response.data.result);
      const result = [];
      let count = 0;
      response.data.result.map((item) => {
        const parsedItem = JSON.parse(item.metadata);
        const info = {
          id: count,
          name: parsedItem.name,
          desc: parsedItem.description,
          url: parsedItem.image
        }
        result.push(info);
        count++;
      });
      setNFTList(result);
      setIsLoading(false);
    })
    .catch((error) => console.log('error', error));
  }, [keyword]);

  const handleSubmit = () => {
    if (inputRef.current.value.length > 0 && inputRef.current.value.length <3) {
      setIsLessThan3(true);
    } else {
      setIsLessThan3(false);
      setKeyword(inputRef.current.value);
    }
  }

  const onClick = () => {
    handleSubmit();
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) handleSubmit();
  }

  return (
    <div className="explore">
      <div className="explore-searchbox">
        <input ref={inputRef} type="search" placeholder="cat" onKeyDown={onKeyDown} />
        <button className="explore-search-button" type="submit" onClick={onClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />< br/>
        </button>
      </div>
      <div className="moreThan3-alert-message">
        {
          isLessThan3 && 'Please type more than 3 words..'
        }
      </div>
      {
        isLoading ?
        <LoadingIndicator /> :
        <CardList NFTList={NFTList} isMypage={false} />
      }
    </div>
  )
}

export default Explore;