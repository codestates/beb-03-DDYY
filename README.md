# DDYY NFT market (http://ddyymarket.cf)


It is Minimal web serveice of NFT market using `truffle-react-box`.

```bash
node version v16
```

## How to start

### server
```bash
cd server
npm install
npm run start
```

### client
```bash
cd client
npm install
npm run start
```

## REST API SERVER

### requirement

We need pinata and moralis API keys in server/.env file.

pinata : https://app.pinata.cloud/keys
moralis : https://admin.moralis.io/

#### HOW?

|METHOD|PATH|Explanation| 
|----|---|---|
|POST|/nft/create|You can issue NFTs.|
|GET|/ether/getNftLists|You can search all NFTs registered in the blockchain.|
|GET|/account/getNfts|You can inquire all the NFTs you have.|


#### Minting Example

![example_minting](https://user-images.githubusercontent.com/96492567/163756982-b9c4dc40-5ec5-49e5-a185-76172260787b.gif)



### License
React is [MIT licensed](./LICENSE)
