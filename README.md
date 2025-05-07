# Bites

Bites is a decentralized Twitter-like application built on the NERO Chain. Users can create short posts, upload images, and comment on posts. The application leverages smart contracts for posting and commenting, and IPFS for image storage. By integrating NERO’s Account Abstraction (AA) framework and Paymaster system, Bites offers a truly frictionless user experience. New users get onboarded with smart wallets automatically created for them, and can interact with the platform without worrying about gas fees or token management. Every action — whether it's posting a Bite, liking a post, or commenting — is seamlessly sponsored by the dApp, thanks to NERO's programmable gas abstraction.

### Features

- Create short posts(Bites) with text and images
- Smart wallets(Account Abstraction) & Gasless transactions with NERO Chain AA Platform % Paymaster API
- Like & Comment on posts(Coming soon)
- Search and filter posts(Coming soon)

### Tech Stack

- NERO Chain, UserOpSDK, Paymaster API
- Solidity, Hardhat
- IPFS
- Next.js, Antd
- Thirdweb
- ethers.js

### Project Structure

```bash
bites/
  ├── packages
        ├── hardhat # Smart contracts and Hardhat project
        ├── frontend #  frontend application
```

### Paymaster API and Account Abstraction Integration

The Bites application utilizes NERO's Paymaster API and Account Abstraction framework to provide a seamless user experience. This integration allows users to interact with the platform without needing to manage gas fees or tokens. The Paymaster API sponsors all transactions, ensuring that users can focus on creating and engaging with content without worrying about the underlying complexities of blockchain interactions.

You can find the UserOpSDK and Paymaster API implementation in the `packages/frontend/src/utils/aaUtils.js` [file](https://github.com/ethdev279/bites/blob/main/packages/frontend/src/utils/aaUtils.js) and integration can be found in the `packages/frontend/src/App.js` [file](https://github.com/ethdev279/bites/blob/b77478390962a7ba108e69c7656c73bff723ad13/packages/frontend/src/App.jsx#L97).

### Deployed Resources:

- [Bites App](https://bites-xi.vercel.app/)
- [Bites Contract](https://testnet.neroscan.io/address/0x641a4700664b9042eec0ed7cddde4c2747ba3338?tab=Transactions)
- [Bites Paymaster](https://testnet.neroscan.io/address/0x5a6680dfd4a77feea0a7be291147768eaa2414ad)

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
![Screen3](https://github.com/user-attachments/assets/e34ddfe9-6a99-4d53-82c3-4cab59c3d519)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
