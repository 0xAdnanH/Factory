# Factory

The Factory project serves as a deployer factory that enables the creation of other Solidity smart contracts using two distinct EVM operations.

## Goals of the Project

The primary objectives of the Factory project are:

- **Highlight CREATE2 and Address Generation:** Showcase the utilization of CREATE2 to deploy contracts at different addresses by incorporating a "salt" value. This ability to manipulate addresses is often used to generate [vanity addresses](https://0xfoobar.substack.com/p/vanity-addresses) to meet specific requirements.

- **Predict Contract Addresses with CREATE2:** Demonstrate the ability to predict the address of a contract to be deployed using CREATE2, both on-chain and off-chain.

- **Address Prediction with CREATE:** While not directly covered in the repository, it's possible to predict addresses on-chain using the create operation with the assistance of the [solady](https://github.com/Vectorized/solady/blob/main/src/utils/LibRLP.sol) library. Off-chain, the process is simpler with direct access to the nonce using `ethers.js` to encode and derive the contract's address.

## Technicalities of the Project

- **Use of OpenZeppelin CREATE2 Library:** The Factory project leverages the OpenZeppelin library, specifically the CREATE2 library, to compute contract addresses and facilitate deployment. This ensures code reuse, minimizes duplication, and reduces the potential for introducing security vulnerabilities.

- **Contract and Function Documentation:** The contract's functions and overall functionality are thoroughly documented using the `nastepc` documentation generator.

- **Unit Tests with ethers.js:** `ethers.js` is employed to create comprehensive unit tests for the project's contract functionalities. These tests validate that the contract performs as expected in diverse scenarios, enhancing the overall reliability and robustness of the codebase.

- **Not to be used with proxies:** This factory just deploys a contract without the ability to execute a call on the deployed contract. It is essential to not use this factory for proxies, but rather use a one that initialize after deployment. Check my other repository where a [Factory that initialize](https://github.com/0xAdnanH/Minimal-Proxy/tree/master) is created.

**Note:** The Factory project is designed to provide insights into CREATE2 and contract address manipulation. It is intended for educational purposes and exploration rather than deployment in a production environment.

## Installation

### cloning the repository

Alternatively you can also clone the repository and install its dependencies to start using the smart contracts.

```bash
$ git clone https://github.com/0xAdnanH/Factory.git
$ cd ./Factory

$ npm install
```

### Instructions

#### Compile

To Compile the contract run:

```bash
$ npx hardhat compile
```

#### Tests

To run the unit tests:

```bash
$ npx hardhat test
```

