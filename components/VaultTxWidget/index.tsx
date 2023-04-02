import { Button, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EastIcon from '@mui/icons-material/East';

const VaultTxWidget = (props: { fromAddress: any; toAddress: any; transactionType: any; }) => {
    const { fromAddress, toAddress, transactionType } = props;
    const [amount, setAmount] = useState(0);

    const handleButtonClick = (event: any) => {
        console.log("handleButtonClick: ", event);
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
                                value={fromAddress}
                            />
                        </TableCell>
                        <TableCell align="left">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{ 'aria-label': 'weight' }}
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
                                value={toAddress}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <Button
                                variant="contained"
                                onClick={handleButtonClick}
                                style={{ minWidth: 115 }}>
                                {transactionType}
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default VaultTxWidget;