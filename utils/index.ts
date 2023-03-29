import { getAddress } from "@ethersproject/address";
import BN from "bn.js";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";

import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "ethers/lib/utils";
import { AddressZero } from "@ethersproject/constants";
import { GlobalConst, SUPPORTED_WALLETS } from "../constants/index";

import { AbstractConnector } from "@web3-react/abstract-connector";
import { injected } from "../connectors";
import Web3 from "web3";

export { default as addArbToMetamask } from "./addArbToMetamask";

interface BasicData {
  token0?: {
    id: string;
    name: string;
    symbol: string;
  };
  token1?: {
    id: string;
    name: string;
    symbol: string;
  };
}

const TOKEN_OVERRIDES: {
  [address: string]: { name: string; symbol: string };
} = {
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": {
    name: "Ether (Wrapped)",
    symbol: "ETH",
  },
  "0x1416946162b1c2c871a73b07e932d2fb6c932069": {
    name: "Energi",
    symbol: "NRGE",
  },
};

export function formatCompact(
  unformatted: number | string | BigNumber | BigNumberish | undefined | null,
  decimals = 18,
  maximumFractionDigits: number | undefined = 3,
  maxPrecision: number | undefined = 4
): string {
  const formatter = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits,
  });

  if (!unformatted) return "0";

  if (unformatted === Infinity) return "∞";

  let formatted: string | number = Number(unformatted);

  if (unformatted instanceof BigNumber) {
    formatted = Number(formatUnits(unformatted.toString(), decimals));
  }

  return formatter.format(Number(formatted.toPrecision(maxPrecision)));
}

export const getPercentChange = (valueNow: number, value24HoursAgo: number) => {
  const adjustedPercentChange =
    ((valueNow - value24HoursAgo) / value24HoursAgo) * 100;
  if (isNaN(adjustedPercentChange) || !isFinite(adjustedPercentChange)) {
    return 0;
  }
  return adjustedPercentChange;
};

export const get2DayPercentChange = (
  valueNow: number,
  value24HoursAgo: number,
  value48HoursAgo: number
) => {
  // get volume info for both 24 hour periods
  const currentChange = valueNow - value24HoursAgo;
  const previousChange = value24HoursAgo - value48HoursAgo;

  const adjustedPercentChange =
    ((currentChange - previousChange) / previousChange) * 100;

  if (isNaN(adjustedPercentChange) || !isFinite(adjustedPercentChange)) {
    return [currentChange, 0];
  }
  return [currentChange, adjustedPercentChange];
};

export function getSecondsOneDay() {
  return 60 * 60 * 24;
}

export function isAddress(value: string | null | undefined): string | false {
  try {
    return getAddress(value || "");
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export const shortenTx = (tx: string) => {
  if (tx.length) {
    const txLength = tx.length;
    const first = tx.slice(0, 6);
    const last = tx.slice(txLength - 4, txLength);
    return `${first}...${last}`;
  }
  return "";
};

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, "any");
  library.pollingInterval = 15000;
  return library;
}

export function isZero(hexNumberString: string): boolean {
  return /^0x0*$/.test(hexNumberString);
}

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}

export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

export function getFormattedPrice(price: number) {
  if (price < 0.001 && price > 0) {
    return "<0.001";
  } else if (price > -0.001 && price < 0) {
    return ">-0.001";
  } else {
    const beforeSign = price > 0 ? "+" : "";
    return beforeSign + price.toLocaleString();
  }
}

// set different bg and text colors for price percent badge according to price.
export function getPriceClass(price: number) {
  if (price > 0) {
    return "bg-successLight text-success";
  } else if (price === 0) {
    return "bg-gray1 text-hint";
  } else {
    return "bg-errorLight text-error";
  }
}

export function formatAPY(apy: number) {
  if (apy > 100000000) {
    return ">100000000";
  } else {
    return apy.toLocaleString();
  }
}

export function formatNumber(
  unformatted: number | string | undefined,
  showDigits = 2
) {
  // get fraction digits for small number
  if (!unformatted) return 0;
  const absNumber = Math.abs(Number(unformatted));
  if (absNumber > 0) {
    const digits = Math.ceil(Math.log10(1 / absNumber));
    if (digits < 3) {
      return Number(unformatted).toLocaleString();
    } else {
      return Number(unformatted).toFixed(digits + showDigits);
    }
  } else {
    return 0;
  }
}

export function returnFullWidthMobile(isMobile: boolean) {
  return isMobile ? 1 : "unset";
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function getWalletKeys(
  connector: AbstractConnector | undefined
): string[] {
  const { ethereum } = window as any;
  const isMetaMask = !!(ethereum && !ethereum.isBitKeep && ethereum.isMetaMask);
  const isBitkeep = !!(ethereum && ethereum.isBitKeep);
  const isBlockWallet = !!(ethereum && ethereum.isBlockWallet);
  const isCypherDWallet = !!(ethereum && ethereum.isCypherD);
  return Object.keys(SUPPORTED_WALLETS).filter(
    (k) =>
      SUPPORTED_WALLETS[k].connector === connector &&
      (connector !== injected ||
        (isCypherDWallet && k == "CYPHERD") ||
        (isBlockWallet && k === "BLOCKWALLET") ||
        (isBitkeep && k === "BITKEEP") ||
        (isMetaMask && k === "METAMASK"))
  );
}

export function isSupportedNetwork(chainId: any) {
  return Number(chainId) === 42161;
}

export function connectedNetwork(chainId: any) {
  switch (Number(chainId)) {
    case 1:
      return "Ethereum";
    case 80001:
      return "Mumbai Testnet";
    case 56:
      return "BSC Mainnet";
    case 137:
      return "Polygon Mainnet";
    case 42161:
      return "Arbitrum One";
    case 10:
      return "Optimism";
    case 5:
      return "Goerli";
    case 11155111:
      return "Sepolia";
    default:
      return "Unknown Network";
  }
}

export function getPageItemsToLoad(index: number, countsPerPage: number) {
  return index === 0 ? countsPerPage : countsPerPage * index;
}

export const convertBNToNumber = (value: BN, decimals: BN) => {
  return Number(value) / 10 ** Number(decimals);
};

export const convertNumbertoBN = (
  value: number,
  decimals: number,
  web3: Web3
) => {
  const valueWithoutDecimal = Number(value.toFixed(0));
  const decimalNumber = value - valueWithoutDecimal;
  return web3.utils
    .toBN(valueWithoutDecimal)
    .mul(web3.utils.toBN(10 ** decimals))
    .add(web3.utils.toBN((decimalNumber * 10 ** decimals).toFixed(0)));
};
