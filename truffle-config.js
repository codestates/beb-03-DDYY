const HDWalletProvider = require("./contracts/node_modules/truffle-hdwallet-provider");

const fs = require("fs");
const MNEMONIC = fs.readFileSync(".secret").toString().trim();

module.exports = {
	networks: {
		/* 
		development: {
			host: "localhost",
			port: 7545,
			gas: 5000000,
			network_id: "*", // Match any network id
		},
		 */
		rinkeby: {
			provider: () =>
				new HDWalletProvider(
					"road patrol accuse mule conduct evil audit deliver wink enjoy please fat",
					`https://rinkeby.infura.io/v3/78a585a507d24a37a60b7eb1f9710e21`,
					1
				),
			network_id: 4,
			gas: 4500000,
			gasPrice: 10000000000,
			confirmations: 2,
			timeoutBlocks: 200,
			skipDryRun: true,
		},
	},
	compilers: {
		solc: {
			version: "0.8.7",
			evmVersion: "london",
		},
	},
	plugins: ["truffle-plugin-verify"],
	api_keys: {
		etherscan: "V9GUD857CZ1WXGXYXY245TFZ5BK1JXXWIJ",
	},
};
