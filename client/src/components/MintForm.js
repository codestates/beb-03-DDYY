import React, {useState, useRef} from "react";
import axios from 'axios';
import Contract from 'web3-eth-contract';
import Web3 from "web3";
import ABI from '../abi/abi.js';


const MintForm = ({ account }) => {

  const deploy_address =  '0x1Dd73A2500886dd8dedC0e8F1E50D9A692784D99';

  const web3 = new Web3('https://rinkeby.infura.io/v3/78a585a507d24a37a60b7eb1f9710e21');
  

  const nameRef = useRef();
  const descRef = useRef();
  let imgFile;

  // 접속한 사람의 주소 가져오기
  const recipient = account[0];

  //Contract연결
  // Contract.setProvider('https://rinkeby.infura.io/v3/78a585a507d24a37a60b7eb1f9710e21');
  // const deploy_address =  '0x1Dd73A2500886dd8dedC0e8F1E50D9A692784D99';
  // const contract       =  new Contract(ABI, deploy_address);
  

  const loadFile = (input) => {
    imgFile = input.target.files[0];
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    const formData = new FormData()
    formData.append('name', nameRef.current.value);
    formData.append('description', descRef.current.value);
    formData.append('file', imgFile);
    
    const data = await axios({
      method: 'post',
      url: 'http://localhost:8080/nft/create',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data);

    mintNFT(data);
  }

  const mintNFT = async (metaData) => {

    window.contract = await new web3.eth.Contract(ABI, deploy_address);

    const transactionParameters = {
      to: deploy_address, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      'data': window.contract.methods.mintNFT(window.ethereum.selectedAddress, metaData).encodeABI() //make call to NFT smart contract 
    };

    //sign transaction via Metamask
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }

    // const nonce = await web3.eth.getTransactionCount(recipient, 'latest'); //get latest nonce

    // //the transaction
    // const tx = {
    //   'from': recipient,
    //   'to': deploy_address,
    //   'nonce': nonce,
    //   'gas': 500000,
    //   'maxPriorityFeePerGas': 1999999987,
    //   'data': contract.methods.mintNFT(recipient, metaData).encodeABI()
    // };
  
    // //step 4: Sign the transaction
    // //const signedTx = await web3.eth.accounts.signTransaction(tx, 'f34c276387cee5b0cc102894d8d2edb7c627f8f432aac171a9bc3930c473fd59');
    // const transactionReceipt = await web3.eth.sendTransaction(tx);
    
    // console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
  }


  return (
    <div className="mintform-wrapper">
      <form encType="multipart/form-data">
        <div className="input-wrapper">
          <label htmlFor="name">NFT Name<br /></label>
          <input ref={nameRef} type="text" id="name" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="desc">NFT Description<br /></label>
          <input ref={descRef} type="text" id="desc" />
        </div>
        <div className="input-wrapper">
          <div className="img-label-wrapper">
            <label className="img-select-label" htmlFor="img">Select Image File<br /></label>
          </div>
          <input type="file" id="img" accept="image/*" style={{display: "none"}} onChange={loadFile.bind(this)} />
        </div>
        <div className="minform-submit-button">
          <button type="submit" onClick={(e) => handleSubmit(e)}>Mint!</button>
        </div>
      </form>
    </div>
  )
}

export default MintForm;