import { Contract } from "@ethersproject/contracts";
import { GraphQLClient } from "graphql-request";
import { utils } from "zksync-ethers";
import { BITES_CONTRACT_ADDRESS, PAYMASTER_ADDRESS } from "./constants";

const BitesABI = [
  "function createBite(string _content, string _imageHash)",
  "function commentOnBite(uint256 _biteId, string _content)",
  "function biteComments(uint256 biteId, uint256 commentId) view returns (uint256 id, uint256 biteId, string content, address author)",
  "function bites(uint256 biteId) view returns (uint256 id, string content, string imageHash, address author)",
];

export const bitesContract = new Contract(BITES_CONTRACT_ADDRESS, BitesABI);
export const paymasterParams = utils.getPaymasterParams(PAYMASTER_ADDRESS, {
  type: "General",
  innerInput: new Uint8Array()
});

const subgraphUrl = "https://api.studio.thegraph.com/query/18583/zk-bites/version/latest";
export const subgraphClient = new GraphQLClient(subgraphUrl);

export const ellipsisAddress = (address) =>
  address.slice(0, 6) + "..." + address.slice(-4);
