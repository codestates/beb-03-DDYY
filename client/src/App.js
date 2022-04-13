import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Explore from "./pages/Explore";
import Create from "./pages/Create";
import Mypage from "./pages/Mypage";
import Token from "./pages/Token";
import Header from "./components/Header";

import "./App.css";


class App extends Component {
  // 상태 정의
  // 현재 페이지 (home, explore, create, mypage)
  // 로그인 여부
  // NFT 데이터 목록


  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/create" element={<Create />} />
              <Route path="/mypage" element={<Mypage account={this.state.accounts} />} />
              <Route path="/token/:tokenId" element={<Token />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;