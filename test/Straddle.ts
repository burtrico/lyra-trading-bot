import { lyraConstants, TestSystem, TestSystemContractsType } from '@lyrafinance/protocol'
import { toBN } from '@lyrafinance/protocol/dist/scripts/util/web3utils';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { Straddle } from '../typechain-types';
import { BigNumber } from 'ethers';

describe('Integration Test', () => {
  let deployer: SignerWithAddress;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let lyraTestSystem: TestSystemContractsType;
  let straddle: Straddle;

  // Mock Lyra Market Params
  const spotPrice = toBN('2000');
  const boardParameter = {
    expiresIn: lyraConstants.DAY_SEC * 7,
    baseIV: '0.9',
    strikePrices: ['1500', '1750', '2000', '2250', '2500'],
    skews: ['1.1', '1', '1.1', '1.3', '1.3'],
  };
  const initialPoolDeposit = toBN('1000000'); // 1.0mln

  before('deploy mock lyra market', async () => {
    deployer = (await ethers.getSigners())[0];
    alice = (await ethers.getSigners())[1];
    bob = (await ethers.getSigners())[2];

    lyraTestSystem = await TestSystem.deploy(deployer);
    await TestSystem.seed(deployer, lyraTestSystem, {
      initialBoard: boardParameter,
      initialBasePrice: spotPrice,
      initialPoolDeposit: initialPoolDeposit,
    });
  });

  before('deploy straddle contract', async () => {
    const Straddle = await ethers.getContractFactory('Straddle');
    straddle = (await Straddle.connect(deployer).deploy()) as Straddle;
    straddle.connect(deployer).initAdapter(
      lyraTestSystem.lyraRegistry.address,
      lyraTestSystem.optionMarket.address,
      lyraTestSystem.testCurve.address,
      lyraTestSystem.basicFeeCounter.address,
    );
  });

  it('opens staddle', async () => {
    await await lyraTestSystem.snx.quoteAsset.mint(alice.address, toBN('1000'));

    await lyraTestSystem.snx.quoteAsset.connect(alice).approve(straddle.address, lyraConstants.MAX_UINT);
    // buy 5 straddle contract for $2000 strike option (pay up to $1000)
    straddle.connect(alice).openStraddle(2, toBN("5"), toBN("1000"));
  });

});
