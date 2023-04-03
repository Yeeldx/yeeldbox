import { Avatar, Box, Button, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Vaults from "./yeeldbox";
import YeeldxLogo from "../assets/images/yeeldxLogo.svg"
const myLoader = ({ src, width, quality }) => {
  return `https://avatars.githubusercontent.com/u/111516461?s=200&v=4`
}

function Home() {

  return (
    <div>
      <Head>
        <title>YeeldBox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 500
        }}
      >
        <Image
          loader={myLoader}
          src={YeeldxLogo}
          alt='YeeldxLogo'
          width={150}
          height={150} />

        <Typography variant="h3" color="inherit" textTransform="none" component="div" >
          YeeldBox
        </Typography>
        <Typography variant="body1" color="inherit" textTransform="none" component="div" marginTop={5}>
          A decentralized, multichain yield optimizer that enables crypto holders to earn compound interest on their assets.
        </Typography>

        <Button href="/yeeldbox" variant="contained" sx={{ marginTop: 5, textTransform: "none", borderRadius: 5, minWidth: 150}}> Enter App</Button>
      </Box>

    </div>
  );
}

export default Home;
