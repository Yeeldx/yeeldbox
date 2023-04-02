import { Box, Button, Card, Chip, Container, Popover, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";
import { addArbToMetamask, connectedNetwork, isSupportedNetwork, shortenAddress } from "../utils";
import WalletIcon from '../assets/images/WalletIcon.png';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React from "react";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);



  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  const toggleWalletModal = () => {

  }

  const switchToArbitrum = () => {
    console.log("addArbToMetamask")
    addArbToMetamask();
  }
  const getConnectBtnClassName = () => {
    return (`connectButton ${isWeb3Available && !isSupportedNetwork(chainId)
      ? 'bg-error'
      : 'bg-primary'
      }`)
  }


  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          p: 1,
          m: 1,
        }}>
        <FiberManualRecordIcon color="success" fontSize="small" />
        <Typography variant="caption" component="span">{connectedNetwork(chainId)}</Typography>
      </Box>
      <Box>
        {account && (!isWeb3Available || isSupportedNetwork(chainId)) ?
          (
            <Chip
              label={shortenAddress(account)}
              variant="outlined"
              sx={{ color: "white" }}
              onClick={toggleWalletModal} />)
          : (
            <Box
              className={`connectButton ${isWeb3Available && !isSupportedNetwork(chainId)
                ? 'bg-error'
                : 'bg-primary'
                }`}
              onClick={() => {
                if (!isWeb3Available || isSupportedNetwork(chainId)) {
                  toggleWalletModal();
                }
              }}
            >
              {isWeb3Available && !isSupportedNetwork(chainId)
                ? 'Wrong Network'
                : 'Connect Wallet'}
              {isWeb3Available && !isSupportedNetwork(chainId) && (
                <Box className='wrongNetworkWrapper'>
                  <Box className='wrongNetworkContent'>
                    <small>Please switch your wallet to Polygon Mumbai Test Network.</small>
                    <Box mt={2.5} onClick={addArbToMetamask}>
                      Switch To Arbitrum
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          )
        }
      </Box>
    </>
  );
};

export default Account;
