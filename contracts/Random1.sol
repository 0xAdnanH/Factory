// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Random {
    constructor() {}

    uint256 public a;
    uint256 public b;
    uint256 public sum;

    function Add() public returns (uint256) {
        return sum = a + b;
    }
}
