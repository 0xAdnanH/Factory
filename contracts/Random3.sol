// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Random3 {
    constructor(uint256 value) payable {}

    uint256 public a;
    uint256 public b;
    uint256 public multiply;

    function multiplication() public returns (uint256) {
        return multiply = a * b;
    }
}
