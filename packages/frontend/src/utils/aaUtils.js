import { Client, Presets } from "userop";
import { bitesContract } from ".";

export const AA_PLATFORM_CONFIG = {
  bundlerRpc: "https://bundler.service.nerochain.io",
  paymasterRpc: "https://paymaster-testnet.nerochain.io"
};

// Your API key from the NERO Chain AA Platform
export const API_KEY = "your_api_key_here";

export const NERO_RPC_URL = "https://rpc-testnet.nerochain.io";

// Add NFT contract for testing
export const CONTRACT_ADDRESSES = {
  entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  accountFactory: "0x9406Cc6185a346906296840746125a0E44976454",
  tokenPaymaster: "0xA919e465871871F2D1da94BccAF3acaF9609D968",
  nftContract: "0x63f1f7c6a24294a874d7c8ea289e4624f84b48cb"
};

export const executeOperation = async (
  accountSigner,
  contractAddress,
  functionName,
  functionParams
) => {
  // Initialize client
  const client = await initAAClient();

  // Initialize builder with paymaster
  const builder = await initAABuilder(accountSigner);

  const callData = bitesContract.interface.encodeFunctionData(
    functionName,
    functionParams
  );

  const userOp = builder.execute(contractAddress, 0, callData);

  // Send the user operation
  console.log("Sending UserOperation to bundler");
  const res = await client.sendUserOperation(userOp);

  console.log("UserOperation sent with hash:", res.userOpHash);

  // Wait for the transaction to be included
  const receipt = await res.wait();

  // Log transaction hash when available
  if (receipt && receipt.transactionHash) {
    console.log("Transaction mined:", receipt.transactionHash);
  }
  // Return operation results
  return {
    userOpHash: res.userOpHash,
    transactionHash: receipt?.transactionHash || "",
    receipt: receipt
  };
};

export const initAAClient = async () => {
  // Initialize the AA Client
  const client = await Client.init(NERO_RPC_URL, {
    overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
    entryPoint: CONTRACT_ADDRESSES.entryPoint
  });
  return client;
};

export const initAABuilder = async (accountSigner) => {
  const builder = await Presets.Builder.SimpleAccount.init(
    accountSigner,
    NERO_RPC_URL,
    {
      overrideBundlerRpc: AA_PLATFORM_CONFIG.bundlerRpc,
      entryPoint: CONTRACT_ADDRESSES.entryPoint,
      factory: CONTRACT_ADDRESSES.accountFactory
    }
  );

  // Set paymaster options with API key
  builder.setPaymasterOptions({
    apikey: API_KEY,
    rpc: AA_PLATFORM_CONFIG.paymasterRpc,
    type: "0" // Default to free (sponsored gas)
  });

  // Set gas parameters for the UserOperation
  builder.setCallGasLimit(300000);
  builder.setVerificationGasLimit(2000000);
  builder.setPreVerificationGas(100000);
  builder.setMaxFeePerGas(10000000);
  builder.setMaxPriorityFeePerGas(10000000);

  return builder;
};
