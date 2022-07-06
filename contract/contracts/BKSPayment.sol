//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IStdReference.sol";

contract BKSPayment is Ownable {
    event NewPayeeSet(address addr);
    event NewOracleSet(address addr);

    uint256 private constant DECIMAL = 1000000000000000000;
    address public _payee = 0xf53ff3f41A9327D12437297F2862B0813b066493;

    // ERC20 private _USDC; // USDC token
    // ERC20 private _BKS;  // BKS token
    IStdReference public _ORACLE;

    constructor() {
        // _USDC = ERC20();  // USDC address
        // _BKS = ERC20();   // BKS address
        _ORACLE = IStdReference(0xDA7a001b254CD22e46d3eAB04d937489c93174C3);
    }

    function setPayee(address newAddr) external onlyOwner {
        _payee = newAddr;
        emit NewPayeeSet(newAddr);
    }

    function setNewOracle(address newAddr) external onlyOwner {
        _ORACLE = IStdReference(newAddr);
        emit NewOracleSet(newAddr);
    }

    function getRate() public view returns (uint256) {
        IStdReference.ReferenceData memory data = _ORACLE.getReferenceData(
            "BNB",
            "EUR"
        );
        return data.rate / DECIMAL;
    }

    function payWithBNB(address owner, uint256 percentage) external payable {
        require(msg.value > 0, "Value required");
        uint256 payeeValue = (msg.value * percentage) / 100;
        uint256 ownerValue = msg.value - payeeValue;
        payable(owner).transfer(ownerValue);
        payable(_payee).transfer(payeeValue);
    }
}
