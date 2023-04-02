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

const Vault = () => {

    const router = useRouter()
    const vid = router.query.id as string
    const [value, setValue] = useState(0);
    const [isLoading, setLoading] = useState(false)
    const [vault, setVault] = useState(undefined);

    useEffect(() => {
        setLoading(true)
        fetch('/api/vault/' + vid)
            .then((res) => res.json())
            .then((response) => {
                console.log("vault: ", response.data)
                if(response.data !== undefined){
                    setVault(response.data)
                }
                setLoading(false)
            })

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