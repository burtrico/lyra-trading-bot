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
  const lyraGlobal = getGlobalDeploys(hre.network.name) as LyraGlobal;
  const lyraMarket = getMarketDeploys(hre.network.name, params.market) as LyraMarket;

  // deploy straddle 
  const Straddle = await ethers.getContractFactory('Straddle');
  const straddle = (await Straddle.connect(deployer).deploy()) as Straddle;
  console.log("Deployed Straddle.sol to:", straddle.address);

  // initialize lyra adapter
  straddle.connect(deployer).initAdapter(
    lyraGlobal.LyraRegistry.address,
    lyraMarket.OptionMarket.address,
    lyraConstants.ZERO_ADDRESS, // Curve sUSD pool address not needed
    lyraConstants.ZERO_ADDRESS, // BasicFeeCounter not set in Goerli yet
  );
  console.log("Initialized Lyra Adapter");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
