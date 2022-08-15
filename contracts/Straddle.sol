// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import { LyraAdapter } from "@lyrafinance/protocol/contracts/periphery/LyraAdapter.sol";

// This simple contract allows users to 
// purchase a straddle (long call + long put) atomically
// https://www.investopedia.com/trading/options-strategies/#toc-6-long-straddle

contract Straddle is LyraAdapter {
  constructor() LyraAdapter() {}

  function initAdapter(
    address _lyraRegistry,
    address _optionMarket,
    address _curveSwap,
    address _feeCounter
  ) external onlyOwner {
    // set addresses for LyraAdapter
    setLyraAddresses(_lyraRegistry, _optionMarket, _curveSwap, _feeCounter);
  }

  function openStraddle(
    uint strikeId, uint amount, uint maxPremium
) public returns (uint totalCost, uint callPositionId, uint putPositionId) {
    require(quoteAsset.transferFrom(msg.sender, address(this), maxPremium), 
      "quote transfer to straddle contract failed");
    
    // open long call
    TradeResult memory callTradeResult = _openPosition(TradeInputParameters(
      strikeId: strikeId,
      positionId: 0,
      iterations: 3,
      optionType: OptionType.LONG_CALL,
      amount: amount.divideDecimal(2);
      setCollateralTo: 0,
      minTotalCost: 0,
      maxTotalCost: type(uint).max,
      rewardRecipient: address(0);
    }));

    // open long put
    TradeResult memory putTradeResult = _openPosition(TradeInputParameters(
      strikeId: strikeId,
      positionId: 0,
      iterations: 3,
      optionType: OptionType.LONG_PUT,
      amount: amount.divideDecimal(2);
      setCollateralTo: 0,
      minTotalCost: 0,
      maxTotalCost: type(uint).max,
      rewardRecipient: address(0);
    }));

    // transfer options to user
    optionToken.transferFrom(address(this), msg.sender, callTradeResult.positionId);
    optionToken.transferFrom(address(this), msg.sender, putTradeResult.positionId);

    // return unused sUSD to user
    quoteBalance = quoteAsset.balanceOf(address(this));
    if (quoteBalance > 0) {
      quoteAsset.transfer(address(this), msg.sender, quoteBalance);
    }

    return (
      callTradeResult.totalCost + putTradeResult.totalCost
      callTradeResult.positionId,
      putTradeResult.positionId
    )
  }
}
