import { Button, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EastIcon from '@mui/icons-material/East';
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import useTokenContract from "../../hooks/useTokenContract";


const VaultTxWidget = (props: { fromAddress: any; toAddress: any; vault: any, transactionType: any }) => {
    const { fromAddress, toAddress, vault, transactionType } = props;
    const { account, library } = useWeb3React();
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isApprovalNeeded, setIsApprovalNeeded] = useState(false);
    const tokenContract = useTokenContract(vault.token.address);

    const handleAmountChange = async (event) => {
        setLoading(true);

        console.log("handleAmountChange: ", event.target.value)
        setAmount(event.target.value)

        if (transactionType === "deposit") {

            const allowance = await tokenContract.allowance(account, vault.address);
            const inputtedAmount = ethers.utils.parseUnits(event.target.value);

            if (allowance >= inputtedAmount) {
                setIsApprovalNeeded(false);
            } else {
                setIsApprovalNeeded(true);
            }
            setLoading(false);
        }

    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left" style={{ fontWeight: "bolder" }}>From</TableCell>
                        <TableCell align="left" style={{ fontWeight: "bolder" }}>Amount</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="center" style={{ fontWeight: "bolder" }}>To</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="left">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{ 'aria-label': 'weight' }}
                                disabled={true}
                                value={fromAddress}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{ 'aria-label': 'weight' }}
                                onChange={handleAmountChange}
                                value={amount}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <EastIcon />
                        </TableCell>
                        <TableCell align="center">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{ 'aria-label': 'weight' }}
                                disabled={true}
                                value={toAddress}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <Button
                                variant="contained"
                                color={isApprovalNeeded ? "warning" : "info"}
                                style={{ minWidth: 115 }}>
                                {isApprovalNeeded ? "APPROVE" : transactionType}
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default VaultTxWidget;