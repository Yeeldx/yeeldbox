import Link from "next/link";
import Account from "../components/Account";
import { AppBar, Toolbar, Typography } from "@mui/material";
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
                    <Typography variant="subtitle1" color="inherit" textTransform="none" href="/" component="a" noWrap sx={{ flexGrow: 1 }} >
                        YeeldBox
                    </Typography>
                    <Account triedToEagerConnect={triedToEagerConnect}/>
                </Toolbar>
            </AppBar>
        </>

    )
}

export default Header;