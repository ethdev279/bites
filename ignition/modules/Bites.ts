import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BitesModule = buildModule("BitesModule", (m) => {
  const bitesContract = m.contract("Bites", []);

  return { bitesContract };
});

export default BitesModule;
