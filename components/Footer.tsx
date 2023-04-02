import { Link, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Typography variant="body2" color="white" align="center" sx={{ mt: 5 }} padding={5}>
            {'Copyright © '}
            <Link color="inherit" href="https://yeeldx.com/">
                Yeeldx
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>

    )
}

export default Footer;