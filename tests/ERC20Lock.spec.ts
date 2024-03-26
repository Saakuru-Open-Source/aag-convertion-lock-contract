import { BigNumber, Wallet } from 'ethers';
import { waffle } from 'hardhat';
import { ERC20Lock, MockERC20 } from '../dist/types';
import { integrationFixture } from './shared/integration';
import { expect } from 'chai';
import { ethers } from 'hardhat';

const INITIAL_SUPPLY = BigNumber.from(10000);
describe('ERC20Lock', function () {
  let users: Wallet[];
  let erc20: MockERC20;
  let lock: ERC20Lock;
  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;
  
  before('create fixture loader', async () => {
    users = await (ethers as any).getSigners();
    loadFixture = waffle.createFixtureLoader(users);
  });
  
  beforeEach('deploy fixture', async () => {
    ({ erc20, lock } = await loadFixture(integrationFixture));
  });

  it('Should return correct balance after transfer', async function () {
    expect(await erc20.balanceOf(users[0].address)).to.equal(INITIAL_SUPPLY);
  });

  it('Should lock tokens and emit event on crossChainConvertERC20', async function () {
    const amountToLock = BigNumber.from(100); // 100 tokens
    const destinationWallet = users[1].address;

    // Approve the lock contract to spend tokens
    await erc20.connect(users[0]).approve(lock.address, amountToLock);

    // Expect to emit CrossChainConversion event
    await expect(lock.connect(users[0]).crossChainConvertERC20(amountToLock, destinationWallet))
      .to.emit(lock, 'CrossChainConversion')
      .withArgs(amountToLock, destinationWallet);

    // Check the lock contract's balance
    expect(await erc20.balanceOf(lock.address)).to.equal(amountToLock);

    // Check the user's balance decreased
    expect(await erc20.balanceOf(users[0].address)).to.equal(INITIAL_SUPPLY.sub(amountToLock));
  });

  it('Should fail if tokens are not approved', async function () {
    const amountToLock = BigNumber.from(10).pow(18).mul(100); // 100 tokens
    const destinationWallet = users[1].address;

    // Try to lock without approving tokens first
    await expect(lock.connect(users[0]).crossChainConvertERC20(amountToLock, destinationWallet))
      .to.be.revertedWith("ERC20: insufficient allowance");
  });

  it('Should revert if trying to interact with an unsupported token', async function () {
    const fakeTokenAddress = await (
      await ethers.getContractFactory('MockERC20')
    ).deploy(
      BigNumber.from(10000).toString(),
    ) as MockERC20;

    await fakeTokenAddress.deployed();

    const amountToLock = BigNumber.from(100); // 100 tokens

    await fakeTokenAddress.connect(users[0]).approve(lock.address, amountToLock);

    await expect(lock.connect(users[0]).crossChainConvertERC20(amountToLock, users[1].address))
      .to.be.revertedWith("ERC20: insufficient allowance");
  });
});
