// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
}

contract ERC20Lock {
    address public tokenAddress;

    event CrossChainConversion(uint256 amount, address indexed destinationWallet);

    constructor(address tokenAddress_) {
        tokenAddress = tokenAddress_;
    }

    function crossChainConvertERC20(uint256 amount_, address destinationWallet_) public {
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount_);
        emit CrossChainConversion(amount_, destinationWallet_);
    }
}