import { useRouter } from 'next/router'
import { Box, Card, CardContent, CardHeader, Grid, Tab, Table, Tabs, TextField, Typography } from "@mui/material";

import { useEffect, useState } from 'react';
import StatsCard from '../../components/StatsCard';
import VaultTxWidget from '../../components/VaultTxWidget';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const _vault = {
    icon: "https://raw.githubusercontent.com/yearn/yearn-assets/master/icons/multichain-tokens/42161/0x239e14A19DFF93a17339DCC444f74406C17f8E67/logo-128.png",
    display_name: "Curve Tricrypto Vault",
    address: "0xdeD8B4ac5a4a1D70D633a87A22d9a7A8851bEa1b",
    token: {
        description: "This token represents a Curve liquidity pool. Holders earn fees from users trading in the pool, and can also deposit the LP to Curve's gauges to earn CRV emissions. This crypto pool contains USDT, WBTC, and WETH. Please be aware that as crypto pools are composed of differently-priced assets, they are subject to impermanent loss."
    },
    strategies: [{
        name: "CurveTriCryptoStrategy",
        address: "0xc4d80C55dc12FF0f2b8680eC31A6ADC4cbC8Dfca",
        description: "Supplies `crv3crypto` to Curve Finance (https://arbitrum.curve.fi) and stakes it in gauge to collect any available tokens and earn CRV rewards. Earned tokens are harvested, sold for more `crv3crypto` which is deposited back into the strategy."
    }]
}

const Vault = () => {

    const router = useRouter()
    const vid = router.query.id as string
    const [value, setValue] = useState(0);
    const [isLoading, setLoading] = useState(false)
    const [vault, setVault] = useState(undefined);

    useEffect(() => {
        setLoading(true)
        if(_vault.address === vid){
            setVault(_vault)
            setLoading(false)
        }
    }, [vid])
    
    const toggleTxType = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const TabPanel = (props: TabPanelProps) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Typography>{children}</Typography>
                )}
            </div>
        );
    }

    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    if (isLoading) return <p>Loading...</p>
    if (vault === undefined) return <p>No Vault found</p>

    return (
        <>
            <Grid container spacing={2} padding={5}>
                <Grid item xs={6} md={3} xl={3}>
                    <StatsCard title="TOTAL DEPOSITED" amount="0.13614" />
                </Grid>
                <Grid item xs={6} md={3} xl={3}>
                    <StatsCard title="NET APY" amount="58%" />
                </Grid>
                <Grid item xs={6} md={3} xl={3}>
                    <StatsCard title="BALANCE" amount="0.00000" />
                </Grid>
                <Grid item xs={6} md={3} xl={3}>
                    <StatsCard title="EARNED" amount="0.00000" />
                </Grid>
            </Grid>

            <Card style={{ padding: 5, margin: 40 }}>
                <Box>
                    <Tabs value={value} onChange={toggleTxType} style={{ backgroundColor: "transparent" }} aria-label="basic tabs example">
                        <Tab label="Deposit" {...a11yProps(0)} />
                        <Tab label="Withdraw" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <VaultTxWidget fromAddress="0xAasdasdae" toAddress="0xC4asdaseadasd" transactionType="deposit"></VaultTxWidget>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <VaultTxWidget fromAddress="0xAasdasdae" toAddress="0xC4asdaseadasd" transactionType="withdraw"></VaultTxWidget>
                </TabPanel>
            </Card>

            <Card style={{ padding: 15, margin: 40 }}>
                <CardHeader title="About" />
                {/* <Box sx={{ borderBottom: 1, borderColor: 'blue' }} padding={2}>
                    <Typography variant="h6" component="span">
                        About
                    </Typography>
                </Box> */}
                <CardContent>
                    <Typography variant="body1" component="div" >
                        {vault?.token?.description}
                    </Typography>

                    <Typography variant="h6" component="div" sx={{ borderBottom: 1, borderColor: 'grey' }} marginTop={5} >
                        Strategies
                    </Typography>

                    {vault?.strategies?.map((strategy, index) => {
                        return (
                            <>
                                <Typography variant="subtitle1" component="div" marginTop={2} marginBottom={1}>
                                    {strategy.name}
                                </Typography>
                                <Typography variant="subtitle2" component="div" marginTop={2} marginBottom={1}>
                                    {strategy.address}
                                </Typography>
                                <Typography variant="body1" component="div" >
                                    {strategy.description}
                                </Typography>
                            </>
                        )
                    })}
                </CardContent>
            </Card>

        </>
    );
}

export default Vault