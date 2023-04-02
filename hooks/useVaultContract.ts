import VAULT_ABI from "../contracts/Vault.json";
import type { Vault } from "../contracts/types";
import useContract from "./useContract";

export default function useVaultContract(vaultAddress?: string) {
  return useContract<Vault>(vaultAddress, VAULT_ABI);
}
