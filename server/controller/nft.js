const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const Contract = require('web3-eth-contract');
//const abi = require('./abi/abi');
require("dotenv").config();

//pinata API 정보
const pinataApiKey = process.env.PINATA_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_KEY;

//Contract연결
// const depoly_address =  fs.readFileSync('./abi/MintingAddress', 'utf8');
// console.log(depoly_address);
// const deploy_abi     =  
// Contract.setProvider('https://rinkeby.infura.io/v3/');
// const contract       =  new Contract(deploy_abi,depoly_address);

async function pinataUpload(filePath){
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append('file', fs.createReadStream(filePath));
    return axios.post(url, data, {
        maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey
        }
    })
    .then(function (response) {
        //handle response here
        return response.data.IpfsHash;
    })
    .catch(function (error) {
       console.log(error);
    });
}

exports.create = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const imgHash = await pinataUpload(req.file.path);
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
    const metaData = await pinataUpload(filePath);
    res.send('https://gateway.pinata.cloud/ipfs/'+metaData);
}
