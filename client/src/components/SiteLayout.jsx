import { Divider, Layout } from "antd";
import { ConnectWallet } from "@thirdweb-dev/react";
import "antd/dist/reset.css";
import "./SiteLayout.css";

const { Header, Footer, Content } = Layout;

export default function SiteLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
          padding: 0,
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h3
          style={{
            margin: 0,
            padding: "0 15px",
            fontWeight: "bold"
          }}
        >
          💬 Bites
        </h3>
        <ConnectWallet
          theme={"light"} // light | dark
          switchToActiveChain={true}
          hideTestnetFaucet={false}
          modalSize={"wide"} // compact | wide
          termsOfServiceUrl="https://example.com/terms"
          privacyPolicyUrl="https://example.com/privacy"
        />
      </Header>

      <Content
        style={{
          margin: "12px 8px",
          padding: 12,
          color: "black",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div className="content-wrapper">{children}</div>
      </Content>

      <Divider plain />
      <Footer style={{ textAlign: "center" }}>
        <a
          href="https://github.com/ethdev279"
          target="_blank"
          rel="noopener noreferrer"
        >
          ©{new Date().getFullYear()} Bites. Powered by ZKsync & TheGraph
        </a>
      </Footer>
    </Layout>
  );
}
