// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Random2 {
    constructor() payable {}

    uint256 public a;
    uint256 public b;
    uint256 public minus;

    function Subtract() public returns (uint256) {
        return minus = a - b;
    }
}
