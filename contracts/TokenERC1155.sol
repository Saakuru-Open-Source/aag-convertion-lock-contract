// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TokenERC1155 is ERC1155 {
    uint256 public constant GOLD = 1;
    uint256 public constant SILVER = 2;

    constructor() ERC1155("https://myitems.com/api/item/{id}.json") {}

    function mintGold(address account, uint256 amount) public {
        _mint(account, GOLD, amount, "");
    }

    function mintSilver(address account, uint256 amount) public {
        _mint(account, SILVER, amount, "");
    }
}
