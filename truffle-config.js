const HDWalletProvider = require("./contracts/node_modules/truffle-hdwallet-provider");

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
					{mnemonic},
					`https://rinkeby.infura.io/v3/{infura api key}`,
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
		etherscan: "{ethenscan api key}",
	},
};
