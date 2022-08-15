import { ethers } from "hardhat";
import hre from 'hardhat';
import { Straddle } from "../typechain-types";
import { getGlobalDeploys, getMarketDeploys, lyraConstants } from "@lyrafinance/protocol";
import { LyraGlobal, LyraMarket } from "@lyrafinance/protocol/dist/test/utils/package/parseFiles";
import { loadParams } from "./utils";

async function main() {
  const deployer = (await ethers.getSigners())[0]; // deployer defined in .env.defaults/private
  const params = loadParams(hre.network.name);

  // get lyra addresses
  // const lyraGlobal = getGlobalDeploys(hre.network.name) as LyraGlobal;
  // const lyraMarket = getMarketDeploys(hre.network.name, params.market) as LyraMarket;

  // deploy straddle 
  const Straddle = await ethers.getContractFactory('Straddle');
  const straddle = (await Straddle.connect(deployer).deploy()) as Straddle;
  console.log("Deployed Straddle.sol to:", straddle.address);

  // initialize lyra adapter
  straddle.connect(deployer).initAdapter(
    "0xabc92540e5D728C7E3E0f53dB2516cf4b8D5B854", // lyraGlobal.LyraRegistry.address,
    "0x797383C9B6Ab622767912C26b7675259A875F449", // lyraMarket.OptionMarket.address,
    lyraConstants.ZERO_ADDRESS, // Curve sUSD address not needed for straddle
    lyraConstants.ZERO_ADDRESS, // lyraGlobal.BasicFeeCounter.address not set in Goerli yet
  );
  console.log("Initialized Lyra Adapter");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
