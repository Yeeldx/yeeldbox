import Link from "next/link";
import Account from "../components/Account";
import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import useEagerConnect from "../hooks/useEagerConnect";

const Header = () => {

    const { account, library } = useWeb3React();
    const triedToEagerConnect = useEagerConnect();
    const isConnected = typeof account === "string" && !!library;

    return (
        <>
            <AppBar
                position="static"
                color="transparent"
                elevation={0}>
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Link href="/">
                        <img
                            src="https://avatars.githubusercontent.com/u/111516461?s=200&v=4"
                            alt='YeeldxLogo'
                            height={60}
                        />
                    </Link>
                    <Stack direction="row" spacing={5} marginLeft={4} sx={{ flexGrow: 1}}>
                        <Typography variant="subtitle1" color="inherit" textTransform="none" href="/" component="a" > 
                            Home
                        </Typography>
                        <Typography variant="subtitle1" color="inherit" textTransform="none" href="/yeeldbox" component="a" > 
                            YeeldBox
                        </Typography>
                        <Typography variant="subtitle1" color="inherit" textTransform="none" href="/docs" component="a" > 
                            Docs
                        </Typography>
                    </Stack>
                    <Account triedToEagerConnect={triedToEagerConnect}/>
                </Toolbar>
            </AppBar>
        </>

    )
}

export default Header;

