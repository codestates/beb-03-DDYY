import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import React, { useRef } from "react";

const Card = ({ name, desc, url, isMypage }) => {

  const inputRef = useRef();

  const handleTransfer = () => {
    const reciepient = inputRef.current.value;
    // transfer 통신 로직
    // console.log('⭐️⭐️⭐️----------------', reciepient);
    inputRef.current.value = '';
  }

  return (
    <div className="card">
      <div className="card-img-wrapper">
        <img src={url} />
      </div>
      <div className="card-text-wrapper">
        <div className="card-name-desc">
          <div className="card-textbox">
            <div className="card-textbox-title">Name</div>
            <div className="card-textbox-content">{name}</div>
          </div>
          <div className="card-textbox">
            <div className="card-textbox-title">Description</div>
            <div className="card-textbox-content">{desc}</div>
          </div>
        </div>
        {
          isMypage === true ?
          <div className="card-transfer">
            <input ref={inputRef} className="card-transfer-input" type="text" />
            <button onClick={handleTransfer}>Transfer</button>
          </div> : null
        }
      </div>
    </div>
  )
}

export default Card;