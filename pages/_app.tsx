import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import getLibrary from "../getLibrary";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/accounts.scss";
import "../styles/layout.css";


function NextWeb3App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Web3ReactProvider>
  );
}

export default NextWeb3App;
