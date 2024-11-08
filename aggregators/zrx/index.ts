import { CHAIN } from "../../helpers/chains";
import { FetchOptions } from "../../adapters/types";
import { getEnv } from "../../helpers/env";
import axios from "axios";

type TChain = {
  [key: string]: number;
};
const CHAINS: TChain = {
  [CHAIN.ARBITRUM]: 42161,
  [CHAIN.AVAX]: 43114,
  [CHAIN.BASE]: 8453,
  [CHAIN.BSC]: 56,
  [CHAIN.ETHEREUM]: 1,
  [CHAIN.OPTIMISM]: 10,
  [CHAIN.POLYGON]: 137,
};

const fetch = async (_a, _b, options: FetchOptions) => {
  const data = await axios.get(`https://api.0x.org/stats/volume/daily?timestamp=${options.startOfDay}&chainId=${CHAINS[options.chain]}`, {
    headers: {
      "0x-api-key": getEnv("AGGREGATOR_0X_API_KEY")
    }
  })
  return {
    dailyVolume: data.data.data.volume
  }
};

const adapter: any = {
  version: 1,
  adapter: Object.keys(CHAINS).reduce((acc, chain) => {
    return {
      ...acc,
      [chain]: {
        fetch: fetch,
        start: 1652745600,
      },
    };
  }, {}),
};

export default adapter;
