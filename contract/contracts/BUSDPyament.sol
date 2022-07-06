//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BUSDPayment {
    ERC20 BUSD;

    constructor(address _addr) {
        BUSD = ERC20(_addr);
    }

    function payWithBUSD(
        address owner,
        uint256 amount,
        address[] memory payees,
        uint256[] memory fees
    ) external {
        BUSD.transferFrom(owner, address(this), amount);
        uint256 cnt = payees.length;
        for (uint256 i = 0; i < cnt; i++) {
            BUSD.transfer(payees[i], (amount * fees[i]) / 100);
        }
    }
}
