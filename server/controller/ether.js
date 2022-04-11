require("dotenv").config();

const Web3 = require('web3');
/* import moralis */
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
const masterKey = process.env.MASTER_KEY;




//const opensea = require("opensea-js");
//const OpenSeaPort = opensea.OpenSeaPort;
// const Network = opensea.Network;
// const API_KEY = "@opensea/v1.0#1j3wv35kyd6wqwc"; // API key is optional but useful if you're doing a high volume of requests.
// function getWeb3() { 
//     const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
//     return web3;
// }
//const provider = new Web3.providers.HttpProvider('https://testnets-api.opensea.io')

// const seaport = new OpenSeaPort(provider, {
//   networkName: Network.Main,
//   apiKey: API_KEY
// })

// async function getAccounts() {
//     try {
//         const accounts = await getWeb3().eth.getAccounts(); 
//         console.log(accounts);
//         return accounts;
//     } catch (e) {
//         console.log(e);
//         return e;
//     }
// }

async function getNftLists(name){
    await Moralis.start({ serverUrl, appId, masterKey });
    const options = { q: name, chain: "rinkeby", filter: "name", limit:20};
    const NFTs = await Moralis.Web3API.token.searchNFTs(options);
    return NFTs;
}

exports.getNftLists = (req, res, next)=>{
    let name = 'ABC';
    if(req.query.name){
        name=req.query.name;
    }
    getNftLists(name).then((result)=>{
        res.send(result);
    })
}

exports.getAccounts = (req, res, next) => {
    getAccounts().then((accounts) => {
        res.send(accounts);
    })
}