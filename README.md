# Bites

Bites is a decentralized Twitter-like application built on the Ethereum blockchain. Users can create short posts, upload images, and comment on posts. The application leverages smart contracts for posting and commenting, and IPFS for image storage. Bites uses TheGraph to index smart contract events and employs subgraphs to efficiently display posts, filter, and search Bites, enhancing the user experience with seamless data retrieval and real-time updates.

### Features

- Create short posts(Bites) with text and images
- Like & Comment on posts
- Search and filter posts(Bites)
- Smart wallets(Account Abstraction) & Gasless transactions with NERO Chain AA Platform % Paymaster API

### Tech Stack

- NERO Chain, UserOpSDK, Paymaster API
- Solidity, Hardhat
- IPFS
- Next.js, Antd
- Thirdweb
- ethers.js

### Deployed Resources:

- [Bites App](https://bites-xi.vercel.app/)
- [Bites Contract](https://sepolia.explorer.zksync.io/address/0x8e1f23171375BC3f2DfF19f8F0F1f4a93451CB74)
- [Bites Paymaster](https://sepolia.explorer.zksync.io/address/0x0De12bb08A3c3006228269211F2505bCB444a4BA)

## Getting Started

This project was scaffolded with [hardhat](https://hardhat.org). Go to `packages/hardhat`.

> Rename `.env.example` to `.env` and update the values.

1. Compile and deploy the smart contracts

```bash
# Go to the hardhat directory
cd packages/hardhat

# Install dependencies
npm install

# compile contracts
npx hardhat compile

# Deploy contracts
npx hardhat ignition deploy ./ignition/modules/Bites.ts --network nero_testnet
```

3. Start the frontend

> Copy `.env.example` to `.env` and update the values. Update `client/utils/constants.js` with the contract addresses.

```bash
# Install dependencies
cd packages/frontend

npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Screenshots

![Screen1](https://github.com/user-attachments/assets/26da483f-7150-40e7-a3bb-2208283a06c0)
![Screen2](https://github.com/user-attachments/assets/1d7c9124-9266-44b2-b530-5217128255bd)
![Screen3](https://github.com/user-attachments/assets/e34ddfe9-6a99-4d53-82c3-4cab59c3d519)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
