# Bites

Bites is a decentralized Twitter-like application built on the Ethereum blockchain. Users can create short posts, upload images, and comment on posts. The application leverages smart contracts for posting and commenting, and IPFS for image storage. Bites uses TheGraph to index smart contract events and employs subgraphs to efficiently display posts, filter, and search Bites, enhancing the user experience with seamless data retrieval and real-time updates.

### Features

- Create short posts(Bites) with text and images
- Like & Comment on posts
- Search and filter posts(Bites)

### Tech Stack

- ZkSync, zksync-cli
- Solidity, Hardhat
- The Graph
- IPFS
- Next.js, Antd
- Thirdweb
- ethers.js

### Deployed Resources:

- [Bites App](https://bites-xi.vercel.app/)
- [Bites Contract](https://sepolia.explorer.zksync.io/address/0xf37a972B8432260135eDaD65b499A1D29Beaf493)
- [Bites Subgraph](https://api.studio.thegraph.com/proxy/18583/zk-bites/version/latest)

## Getting Started

This project was scaffolded with [zksync-cli](https://github.com/matter-labs/zksync-cli).

> Rename `.env.example` to `.env` and update the values.

1. Compile and deploy the smart contracts

```bash

# Install dependencies
npm install

# compile contracts
npm run compile

# Deploy contracts
npm run deploy
```

2. Deploy the subgraph

> Create a new subgraph on [The Graph](https://thegraph.com/studio). Update `subgraph.yaml` with deployed contract address and startblock. Update `package.json` deploy script with the subgraph name.

```bash
# Install dependencies
cd subgraph

npm install

npm run codegen

npm run deploy
```

3. Start the Next.js frontend

> Copy `.env.example` to `.env` and update the values. Update `client/utils/constants.js` with the contract addresses.

```bash
# Install dependencies
cd client

npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Screenshots

![Screen1](https://github.com/ethdev279/bites/assets/45661693/7b1abaf3-9500-46ea-9080-cab935dc301c)
![Screen2](https://github.com/ethdev279/bites/assets/45661693/cf75ab73-90fd-4a34-be84-fb65f0fc2b15)
![Screen3](https://github.com/ethdev279/bites/assets/45661693/11ca5e3b-ab26-4994-b63e-3d06c8c2401a)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
