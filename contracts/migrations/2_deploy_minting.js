const fs = require("fs");
const Minting = artifacts.require("./Mingting.sol");

module.exports = function (deployer) {
	console.log("deploy...");
	deployer.deploy(Minting).then(() => {
		if (Minting._json) {
			fs.writeFile("ABI", JSON.stringify(Minting._json.abi), (err) => {
				if (err) throw err;
				console.log("ABI Success");
			});

			fs.writeFile("address", Minting.address, (err) => {
				if (err) throw err;
				console.log("Address Success");
			});
		}
	});
};
