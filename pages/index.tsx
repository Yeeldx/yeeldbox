import Head from "next/head";
import Vaults from "./vaults";


function Home() {

  

  return (
    <div>
      <Head>
        <title>next-web3-boilerplate</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Vaults></Vaults>
  
    </div>
  );
}

export default Home;
