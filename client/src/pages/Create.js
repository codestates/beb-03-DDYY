import React from "react";
import MintForm from "../components/MintForm";

const Create = ({ account }) => {
  return (
    <div className="create">
      <div className="create-text-wrapper">
        <span>Mint&nbsp;</span> your own NFT!
      </div>
      <MintForm account={account} />
    </div>
  )
}

export default Create;