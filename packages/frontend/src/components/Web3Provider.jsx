import { useState, useEffect } from "react";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  rainbowWallet,
  trustWallet
} from "@thirdweb-dev/react";
import { Ethereum, configureChain } from "@thirdweb-dev/chains";

const NeroTestnet = configureChain({
  name: "Nero Testnet",
  shortName: "NeroTestnet",
  chainId: 689,
  rpc: ["https://rpc-testnet.nerochain.io"],
  nativeCurrency: {
    name: "Nero",
    symbol: "NERO",
    decimals: 18
  },
  testnet: true,
  slug: "nerotestnet",
  explorers: [
    {
      name: "Nero Testnet Explorer",
      url: "https://testnet.neroscan.io/",
      standard: "EIP3091"
    }
  ]
});

const supportedWallets = [
  metamaskWallet({ recommended: true }),
  coinbaseWallet({ recommended: true }),
  walletConnect(),
  rainbowWallet(),
  trustWallet()
];
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

export default function Web3Provider({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <ThirdwebProvider
      activeChain={NeroTestnet}
      supportedChains={[NeroTestnet, Ethereum]}
      supportedWallets={supportedWallets}
      autoConnect={true}
      clientId={clientId}
      dAppMeta={{
        name: "Bites",
        description:
          "Decentralized social media platform for sharing short content",
        logoUrl: "https://example.com/logo.png",
        url: "https://example.com",
        isDarkMode: true
      }}
    >
      {mounted && children}
    </ThirdwebProvider>
  );
}
