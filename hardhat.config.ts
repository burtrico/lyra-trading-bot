import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-dependency-compiler'
import 'hardhat-tracer';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from "hardhat/config";
import { lyraContractPaths } from '@lyrafinance/protocol/dist/test/utils/package/index-paths'
import { loadEnv } from "./scripts/utils";
dotenv.config();

const config: HardhatUserConfig = {
  networks: {
    local: {
      url: 'http://127.0.0.1:8545',
      gas: "auto",
      gasPrice: 0,
    },
    'goerli-ovm': {
      url: 'https://goerli.optimism.io/	',
      gasPrice: 0,
      gas: 15000000,
      accounts: [loadEnv().PRIVATE_KEY],
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
  dependencyCompiler: {
    paths: lyraContractPaths,
  }
};

export default config;
