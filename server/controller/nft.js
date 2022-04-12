const fs = require('fs');

const Contract = require('web3-eth-contract');
const abi = require('../abi/abi');
const ipfs = require('../module/ipfs');

//Contract연결
Contract.setProvider('https://rinkeby.infura.io/v3/78a585a507d24a37a60b7eb1f9710e21');
const deploy_address =  fs.readFileSync('../address', 'utf8');
const deploy_abi =  abi.getABI();
//const deploy_abi2 =  JSON.stringify(fs.readFileSync('../ABI', 'utf8'));

const contract       =  new Contract(deploy_abi,deploy_address);

exports.create = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const imgHash = await ipfs.pinataUpload(req.file.path);
    console.log(imgHash);
    var createJson = {
        name : name,
        description : description,
        image : 'https://gateway.pinata.cloud/ipfs/'+imgHash
    }
    var jsonData = JSON.stringify(createJson);
    var filePath = "./upload/"+name;
    fs.writeFileSync(filePath,jsonData,(err)=>{
        console.log(err);
    })
    let metaData = await ipfs.pinataUpload(filePath);
    res.send('https://gateway.pinata.cloud/ipfs/'+ metaData);

    metaData = 'https://gateway.pinata.cloud/ipfs/'+ metaData;

    const result = contract.methods.mintNFT('0x47Ebe01EE3D9fFaE4fFF03fb1A9c1f6e29a277ab',metaData);

    const result2 = await contract.methods.balanceOf('0x47Ebe01EE3D9fFaE4fFF03fb1A9c1f6e29a277ab').call();
    console.log(result2);
}
