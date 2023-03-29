const addArbToMetamask: () => void = () => {
  const { ethereum } = window as any;
  if (ethereum) {
    ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xA4B1' }],
      })
      .catch((err: any) => {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          ethereum
            .request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0xA4B1',
                  chainName: 'Arbitrum Mainnet',
                  rpcUrls: ['https://rpc.ankr.com/arbitrum/'],
                  iconUrls: [
                    'https://github.com/trustwallet/assets/blob/master/blockchains/arbitrum/info/logo.png',
                  ],
                  blockExplorerUrls: ['https://arbiscan.io/'],
                  nativeCurrency: {
                    name: 'ARETH',
                    symbol: 'ARETH',
                    decimals: 18,
                  },
                },
              ], // you must have access to the specified account
            })
            .catch((error: any) => {
              if (error.code === 4001) {
                console.log('We can encrypt anything without the key.');
              } else {
                console.error(error);
              }
            });
        }
      });
  }
};

export default addArbToMetamask;
