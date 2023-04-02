
import { Box, Button, Card, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";

const _vaults = [
    {
        icon: "https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/42161/0x239e14A19DFF93a17339DCC444f74406C17f8E67/logo-128.png",
        display_name: "Curve Tricrypto Vault",
        address: "0xdeD8B4ac5a4a1D70D633a87A22d9a7A8851bEa1b",
        apy: { net_apy: "58%" },
        details: { availableDepositLimit: 0 },
        tvl: { tvl_deposited: 0, price: 0 },
        status: 1
    },
    {
        icon: "",
        display_name: "MAGIC-ETH LP vault",
        address: "",
        apy: { net_apy: "0.00%" },
        details: { availableDepositLimit: 0 },
        tvl: { tvl_deposited: 0, price: 0 },
        status: 0
    },
]

const Vaults = () => {
    const [vaults, setVaults] = useState([]);
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/vaults')
            .then((res) => res.json())
            .then((vaults) => {
                console.log("vaults: ", vaults)
                setVaults(vaults)
                setLoading(false)
            })
    }, [])


    if (isLoading) return <p>Loading...</p>
    if (vaults.length === 0) return <p>No Vaults</p>
    return (
        <div>
            <Grid container spacing={2} padding={5}>
                <Grid item xs={6} md={6} xl={6}>
                    <StatsCard title="DEPOSITED" amount="0.00" />
                </Grid>
                <Grid item xs={6} md={6} xl={6}>
                    <StatsCard title="EARNED" amount="0.00" />
                </Grid>
            </Grid>

            <Box
                margin={5}
                sx={{ backgroundColor: 'primary' }}>
                <TableContainer component={Card}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" style={{ fontWeight: "bolder" }}>Token</TableCell>
                                <TableCell align="left" style={{ fontWeight: "bolder" }}>APY</TableCell>
                                <TableCell align="left" style={{ fontWeight: "bolder" }}>Available</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }}>Deposited</TableCell>
                                <TableCell align="center" style={{ fontWeight: "bolder" }}>TVL</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vaults.map((vault) => (
                                <TableRow>
                                    <TableCell align="left">
                                        <span
                                            style={{
                                                backgroundImage: "url(" + vault.icon + ")",
                                            }}
                                        ></span>
                                        <span className="title">{vault.display_name}</span></TableCell>
                                    <TableCell align="left">{vault.apy.net_apy}</TableCell>
                                    <TableCell align="left">{vault.details.availableDepositLimit}</TableCell>
                                    <TableCell align="center">{vault.tvl.tvl_deposited}</TableCell>
                                    <TableCell align="center">{vault.tvl.price}</TableCell>
                                    <TableCell align="center">{vault.status === 0 ?
                                        <Typography variant="caption" component="span">
                                            Coming Soon!
                                        </Typography> :
                                        <Button variant="contained" href={`/vault/${vault.address}`}>VIEW</Button>
                                    }</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}

export default Vaults;