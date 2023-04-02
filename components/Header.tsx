import Link from "next/link";
import Account from "../components/Account";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {

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
                    <Account />
                </Toolbar>
            </AppBar>
        </>

    )
}

export default Header;