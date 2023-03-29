import { Box } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";
import { injected } from "../connectors";
import useENSName from "../hooks/useENSName";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { formatEtherscanLink, shortenHex } from "../util";
import { addArbToMetamask, connectedNetwork, isSupportedNetwork, shortenAddress } from "../utils";
import WalletIcon from '../assets/images/WalletIcon.png';

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
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  const toggleWalletModal = () => {

  }

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  /* if (typeof account !== "string") {
    return (
      <div>
        {isWeb3Available ? (
          <button
            disabled={connecting}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? "Connect to MetaMask" : "Connect to Wallet"}
          </button>
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}
      </div>
    );
  }
 */
  return (
    <Box className='header'>
      <Box className='networkName'>
        <Box className='styledPollingDot' />
        <p>{connectedNetwork(chainId)}</p>
      </Box>
      {account && (!isWeb3Available || isSupportedNetwork(chainId)) ? (
        <Box
          id='web3-status-connected'
          className='accountDetails'
          onClick={toggleWalletModal}
        >
          <p>{shortenAddress(account)}</p>
          {/* <img src={WalletIcon} alt='Wallet' /> */}
        </Box>
      ) : (
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
                <small>{'Please switch your wallet to Arbitrum Network.'}</small>
                <Box mt={2.5} onClick={addArbToMetamask}>
                  {'Switch to Arbitrum'}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Account;


/* {<a
      {...{
        href: formatEtherscanLink("Account", [chainId, account]),
        target: "_blank",
        rel: "noopener noreferrer",
      }}
    >
      {ENSName || `${shortenHex(account, 4)}`}
    </a>} */