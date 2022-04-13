const Web3 = require("web3");
/* import moralis */
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
const masterKey = process.env.MASTER_KEY;

async function getNfts(address) {
	await Moralis.start({ serverUrl, appId, masterKey });
	const testnetNFTs = await Moralis.Web3API.account.getNFTs({
		chain: "rinkeby",
		address: address,
	});
	return testnetNFTs;
}

exports.getNfts = (req, res) => {
	let address = req.query.address;
	getNfts(address).then((nfts) => {
		res.send(nfts);
	});
};
