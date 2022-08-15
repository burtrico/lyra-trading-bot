import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-dependency-compiler'
import { HardhatUserConfig } from "hardhat/config";
import { lyraContractPaths } from '@lyrafinance/protocol/dist/test/utils/package/index-paths'


const config: HardhatUserConfig = {
  networks: {
    local: {
      url: 'http://127.0.0.1:8545',
      gasPrice: 0,
    },
    'goerli-ovm': {
      url: 'https://goerli.optimism.io/	',
      gasPrice: 0,
    }
  },
  solidity: "0.8.9",
  dependencyCompiler: {
    paths: lyraContractPaths,
  }
};

export default config;
