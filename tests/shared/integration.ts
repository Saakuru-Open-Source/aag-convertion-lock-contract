import { ethers } from 'hardhat';
import { Fixture } from 'ethereum-waffle';
import { MockERC20, ERC20Lock } from '../../dist/types';
import { BigNumber } from 'ethers';

interface ContractFixture {
  erc20: MockERC20;
  lock: ERC20Lock;
}

export const integrationFixture: Fixture<ContractFixture> =
  async function (): Promise<ContractFixture> {
    const users = await ethers.getSigners();
    
    const erc20 = await (
      await ethers.getContractFactory('MockERC20')
    ).deploy(
      BigNumber.from(10000).toString(),
    ) as MockERC20;

    await erc20.deployed();



    const lock = await (
      await ethers.getContractFactory('ERC20Lock')
    ).deploy(
      erc20.address
    ) as ERC20Lock;

    await lock.deployed();

    return {
      erc20,
      lock,
    };
  };
