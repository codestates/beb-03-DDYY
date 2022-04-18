import React, { useRef, useState } from "react";
import Web3 from "web3";
import ABI from "../abi/abi.js";

const Card = ({ id, name, desc, url, myAccount, isMypage }) => {
	const inputRef = useRef();

	const [message, setMessage] = useState("");
	const [txAddress, setTxAddress] = useState("");

	const transferToken = async () => {

    if (inputRef.current.value === "") {
			setMessage("formError");
			return;
		}

		// from, to, tokenId
		const from = myAccount;
		const to = inputRef.current.value;
		const tokenId = id;

		setMessage("loading");

		const deploy_address = "0x1Dd73A2500886dd8dedC0e8F1E50D9A692784D99";
		const web3 = new Web3("https://rinkeby.infura.io/v3/{infura api key}");

		window.contract = await new web3.eth.Contract(ABI, deploy_address);

		const transactionParameters = {
			to: deploy_address, // Required except during contract publications.
			from: window.ethereum.selectedAddress, // must match user's active address.
			"data": window.contract.methods
				.transferFrom(window.ethereum.selectedAddress, to, tokenId)
				.encodeABI(), //make call to NFT smart contract
		};

		//sign transaction via Metamask
		try {
			const txHash = await window.ethereum.request({
				method: "eth_sendTransaction",
				params: [transactionParameters],
			});
			setTxAddress(txHash);
			setMessage("success");
		} catch (error) {
			console.log(error);
			setMessage("failure");
		}

		inputRef.current.value = "";
	};

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
				{isMypage === true ? (
					<div className="card-transfer">
						<input ref={inputRef} className="card-transfer-input" type="text" />
						<button onClick={transferToken}>Transfer</button>
					</div>
				) : null}
				{message === "success" && (
					<div className="transfer-success-message">
						NFT has been successfully issued!
						<br />
						Check your Transaction&nbsp;
						<a
							target="_blank"
							href={"https://rinkeby.etherscan.io/tx/" + txAddress}
						>
							HERE!
						</a>
					</div>
				)}
				{message === "failure" && (
					<div className="transfer-failure-message">
						Something wrong! Try again 😵‍💫
					</div>
				)}
        {message === "formError" && (
					<div className="transfer-failure-message">
						All fields must be filled in.
					</div>
				)}
				{message === "loading" && (
					<div className="transfer-loading-message">
						Please wait...&nbsp;
						<img
							className="loading-indicator2"
							alt="now loading..."
							src="loading2.gif"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
