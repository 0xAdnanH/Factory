const { expect } = require("chai");
const { ethers } = require("hardhat");
const { applyErrorMessageTemplate } = require("hardhat/internal/core/errors");
const random2bytecode =
  require("../artifacts/contracts/Random2.sol/Random2.json").bytecode;
const randombytecode =
  require("../artifacts/contracts/Random1.sol/Random.json").bytecode;
const random3bytecode =
  require("../artifacts/contracts/Random3.sol/Random3.json").bytecode;

let factoryContract;
let MyContractFactory;

before(async () => {
  MyContractFactory = await ethers.getContractFactory("Factory");
  factoryContract = await MyContractFactory.deploy();
});

describe("Testing Create Function", () => {
  it("should create a new contract successfully via create", async () => {
    await expect(factoryContract.createContract(randombytecode, 0)).to.emit(
      factoryContract,
      "contractCreated"
    );
  });
});

describe("Testing create2Contract function", () => {
  let salt = ethers.utils.randomBytes(32);
  let valueToSend = ethers.utils.parseEther("1");
  it("should predict contract", async () => {
    const bytecodeHash = ethers.utils.solidityKeccak256(
      ["bytes"],
      [random2bytecode]
    );
    const predictedAddress = await factoryContract.predictAddress2(
      salt,
      bytecodeHash
    );
    const createdAddress = await factoryContract.callStatic.create2Contract(
      random2bytecode,
      0,
      salt
    );

    expect(predictedAddress == createdAddress).to.be.true;
  });

  it("should create a new contract successfully via create2 ", async () => {
    const bytecodeHash = ethers.utils.solidityKeccak256(
      ["bytes"],
      [random2bytecode]
    );
    const predictedAddress = await factoryContract.predictAddress2(
      salt,
      bytecodeHash
    );
    await expect(factoryContract.create2Contract(random2bytecode, 0, salt))
      .to.emit(factoryContract, "contractCreated")
      .withArgs(predictedAddress);
  });
  it("should revert if amount is send to the created address with no payable constructor", async () => {
    await expect(
      factoryContract.create2Contract(randombytecode, valueToSend, salt, {
        value: valueToSend,
      })
    ).to.be.reverted;
  });
  it("should emit event if amount is send to payable constructor", async () => {
    const salt = ethers.utils.randomBytes(32);
    await expect(
      factoryContract.create2Contract(random2bytecode, valueToSend, salt, {
        value: valueToSend,
      })
    ).to.emit(factoryContract, "contractCreated");
  });
  it("should revert if same bytecode and salt is passed", async () => {
    await expect(
      factoryContract.create2Contract(random2bytecode, valueToSend, salt, {
        value: valueToSend,
      })
    ).to.be.reverted;
  });
  it("should emit event when deploying contract with constructor parameters", async () => {
    const salt = ethers.utils.randomBytes(32);
    const constructorBYTECODE = ethers.utils.defaultAbiCoder
      .encode(["uint256"], [1])
      .slice(2);
    const bytecodeToDeploy = random3bytecode + constructorBYTECODE;
    await expect(
      factoryContract.create2Contract(bytecodeToDeploy, valueToSend, salt, {
        value: valueToSend,
      })
    ).to.emit(factoryContract, "contractCreated");
  });
});
