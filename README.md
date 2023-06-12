## Installation

### cloning the repository

You can clone the repository and install its dependencies to start using the smart contracts.

```bash
$ git clone https://github.com/0xAdnanH/Factory.git
$ cd ./Factory
$ npm install
```
## Background
In Ethereum, smart contracts can create other contracts through the use of opcodes like CREATE and CREATE2. The CREATE opcode deploys a new contract at a unique address, while the CREATE2 opcode allows for deterministic contract deployment at a specific address based on a given salt value. These opcodes offer flexibility in contract creation and are commonly used in scenarios where multiple instances of a contract need to be deployed.

## Explanation 

This Factory contract uses two opcodes (CREATE && CREATE2) for creating new contracts . The contract has a predict function "predictAddress2" to compute the created address by CREATE2 .

