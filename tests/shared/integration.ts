import { ethers } from 'hardhat';
import { Fixture } from 'ethereum-waffle';
import { TokenERC1155, TokenERC721, TokenERC20 } from '../../dist/types';

interface ContractFixture {
  erc20: TokenERC20;
  erc721: TokenERC721;
  erc1155: TokenERC1155;
}

export const integrationFixture: Fixture<ContractFixture> =
  async function (): Promise<ContractFixture> {
    const users = await ethers.getSigners();

    // nft
    const erc20 = await (
      await ethers.getContractFactory('TokenERC20')
    ).deploy() as TokenERC20;
    await erc20.deployed();

    const erc721 = await (
      await ethers.getContractFactory('TokenERC721')
    ).deploy() as TokenERC721;
    await erc721.deployed();

    const erc1155 = await (
      await ethers.getContractFactory('TokenERC1155')
    ).deploy() as TokenERC1155;
    await erc1155.deployed();
    
    return {
      erc20,
      erc721,
      erc1155,
    };
  };
