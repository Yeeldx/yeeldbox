import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

const Docs = () => {
    useEffect(() => {
        window.location.href = "https://docs.yeeldx.com/";
    }, []);

    return (
        <Box
            sx={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: 500
            }}
        >
            <Typography variant="h6" color="inherit" textTransform="none" component="div" sx={{ alignItems: "center" }} >
                You are being redirecting to https://docs.yeeldx.com/
            </Typography>
        </Box>
    );
}

export default Docs;