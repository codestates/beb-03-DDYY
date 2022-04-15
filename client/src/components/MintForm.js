import React, {useRef, useState} from "react";
import axios from 'axios';
import Web3 from "web3";
import ABI from '../abi/abi.js';


const MintForm = () => {

  const nameRef = useRef();
  const descRef = useRef();
  let imgFile;

  const [message, setMessage] = useState('');
  const [txAddress, setTxAddress] = useState('');

  const deploy_address =  '0x1Dd73A2500886dd8dedC0e8F1E50D9A692784D99';
  const web3 = new Web3('https://rinkeby.infura.io/v3/78a585a507d24a37a60b7eb1f9710e21');

  const loadFile = (input) => {
    imgFile = input.target.files[0];
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    if (nameRef === '' || descRef === '' || imgFile === undefined) {
      setMessage('formError');
      return;
    }

    setMessage('loading');

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
    nameRef.current.value = '';
    descRef.current.value = '';
    imgFile = null;
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
            })
        console.log('⭐️⭐️⭐️----------------', txHash);
        setTxAddress(txHash);
        setMessage('success');
    } catch (error) {
      console.log(error);
      setMessage('failure');
    }
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
      <div className="mintfomr-alert-message-wrapper">
        {
          message === 'formError' &&
          <div className="mintform-filling-error-message">
            All fields must be filled in.
          </div>
        }
        {
          message === 'success' &&
          <div className="mintform-success-message">
            NFT has been successfully issued!<br />
            Check your Transaction&nbsp;
            <a target="_blank" href={'https://rinkeby.etherscan.io/tx/' + txAddress}>HERE!</a>
          </div>
        }
        {
          message === 'failure' &&
          <div className="mintform-failure-message">
            Something wrong! Try again
          </div>
        }
        {
          message === 'loading' &&
          <div className="mintform-loading-message">
            Please wait...&nbsp;
            <img className="loading-indicator2" alt="now loading..." src="loading2.gif" />
          </div>
        }
      </div>
    </div>
  )
}

export default MintForm;