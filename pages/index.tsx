import Head from "next/head";
import Vaults from "./vaults";


function Home() {

  return (
    <div>
      <Head>
        <title>YeeldBox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Vaults></Vaults>

    </div>
  );
}

export default Home;
