// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BitesModule = buildModule("BitesModule", (m) => {
  const bites = m.contract("Bites", [], {});

  return { bites };
});

export default BitesModule;
