import React from "react";

const MintForm = () => {
  return (
    <div className="mintform-wrapper">
      <form enctype="multipart/form-data">
        <div className="input-wrapper">
          <label for="name">NFT Name<br /></label>
          <input type="text" id="name" />
        </div>
        <div className="input-wrapper">
          <label for="desc">NFT Description<br /></label>
          <input type="text" id="desc" />
        </div>
        <div className="input-wrapper">
          <label for="img">Image<br /></label>
          <input type="file" id="img" accept="image/*"/>
        </div>
        <div className="minform-submit-button">
          <button type="submit">Mint!</button>
        </div>
      </form>
    </div>
  )
}

export default MintForm;