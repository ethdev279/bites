import { Contract } from "@ethersproject/contracts";
import { JsonRpcProvider } from "@ethersproject/providers";
import { BITES_CONTRACT_ADDRESS } from "./constants";

const BitesABI = [
  "function createBite(string _content, string _imageHash)",
  "function bitesList(uint256) view returns (uint256 id, string content, string imageHash, uint256 likes, uint256 comments, address author)",
  "function bites(uint256 biteId) view returns (uint256 id, string content, string imageHash, address author)",
  "function currentBiteId() view returns (uint256)",
  "function getAllBites() view returns (tuple(uint256 id, string content, string imageHash, uint256 likes, uint256 comments, address author)[])"
];
export const neroTestnetProvider = new JsonRpcProvider(
  "https://rpc-testnet.nerochain.io",
  689,
  {
    staticNetwork: true
  }
);

export const bitesContract = new Contract(
  BITES_CONTRACT_ADDRESS,
  BitesABI,
  neroTestnetProvider
);

export const ellipsisAddress = (address) =>
  address.slice(0, 6) + "..." + address.slice(-4);
