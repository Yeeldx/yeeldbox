#YeeldBox Frontend

Yeeldx is a decentralized, multichain yield optimizer that enables crypto holders to earn compound interest on their assets. Similarly, to Yearn, Yeeldx maximizes user rewards from various liquidity pools and yield farming opportunities in the DeFi ecosystem, while prioritizing safety and efficiency.
The main product offered by Yeeldx Finance are Vaults, where users can stake their crypto tokens and automatically compound their rewards. Despite the name "Vault" suggesting otherwise, users can withdraw their funds at any time and remain 100% in control of their crypto.


### Auto Contract Type Generation

**Note**: After adding in your new contract ABIs (in JSON format) to the `/contracts` folder, run `yarn compile-contract-types` to generate the types.

You can import these types when declaring a new Contract hook. The types generated show the function params and return types of your functions, among other helpful types. 

```ts
import MY_CONTRACT_ABI from "../contracts/MY_CONTRACT.json";
import type { MY_CONTRACT } from "../contracts/types";
import useContract from "./useContract";

export default function useMyContract() {
  return useContract<MY_CONTRACT>(CONTRACT_ADDRESS, MY_CONTRACT_ABI);
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
