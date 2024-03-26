import { Wallet } from 'ethers';
import { waffle } from 'hardhat';
import { TokenERC1155 } from '../dist/types';
import { integrationFixture } from './shared/integration';

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ERC1155', function () {
  let users: Wallet[];
  let erc1155: TokenERC1155;
  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;
  
  before('create fixture loader', async () => {
    users = await (ethers as any).getSigners();
    loadFixture = waffle.createFixtureLoader(users);
  });
  
  beforeEach('deploy fixture', async () => {
    ({ erc1155 } = await loadFixture(integrationFixture));
    await erc1155.connect(users[0]).mintGold(users[0].address, 1);
  });

  it('Should airdrop a new ERC721 token and get its balance', async function () {
    expect(await erc1155.balanceOf(users[0].address, 1)).to.equal(1);
  });

});