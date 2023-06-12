// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
@title Factory
@dev A contract for creating and deploying smart contracts using the CREATE and CREATE2 opcodes.
*/

import "@openzeppelin/contracts/utils/Create2.sol";

contract Factory {
    /**
     * @dev Emitted when a new contract is created.
     * @param newContract The address of the newly created contract.
     */
    event contractCreated(address newContract);

    /**
     * @dev Creates a contract using the CREATE opcode.
     * @param bytecode The bytecode of the contract to be created.
     * @param valueToSend The amount of ether to send along with the creation transaction.
     * @return The address of the newly created contract.
     */
    function createContract(
        bytes memory bytecode,
        uint256 valueToSend
    ) public returns (address) {
        address newContract;

        assembly {
            newContract := create(
                valueToSend,
                add(bytecode, 0x20),
                mload(bytecode)
            )
        }

        require(newContract != address(0), "Failed to create contract");
        emit contractCreated(newContract);
        return newContract;
    }

    /**
     * @dev Creates a contract using the CREATE2 opcode.
     * @param bytecode The bytecode of the contract to be created.
     * @param valueToSend The amount of ether to send along with the creation transaction.
     * @param salt A salt value used to determine the address of the newly created contract.
     * @return The address of the newly created contract.
     */
    function create2Contract(
        bytes memory bytecode,
        uint256 valueToSend,
        bytes32 salt
    ) public payable returns (address) {
        address newContract2;
        require(bytecode.length != 0, "Create2: bytecode length is zero");

        assembly {
            newContract2 := create2(
                valueToSend,
                add(bytecode, 0x20),
                mload(bytecode),
                salt
            )
        }

        require(newContract2 != address(0), "Failed to create contract");
        emit contractCreated(newContract2);
        return newContract2;
    }

    /**
     * @dev Predicts the address of a contract to be created using the CREATE2 opcode.
     * @param salt A salt value used to determine the address of the newly created contract.
     * @param bytecode The bytecode of the contract to be created.
     * @return The predicted address of the contract.
     */
    function predictAddress2(
        bytes32 salt,
        bytes32 bytecode
    ) public view returns (address) {
        return Create2.computeAddress(salt, bytecode, address(this));
    }
}
