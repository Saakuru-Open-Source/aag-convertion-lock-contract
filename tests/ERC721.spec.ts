import { Wallet } from 'ethers';
import { waffle } from 'hardhat';
import { TokenERC721 } from '../dist/types';
import { integrationFixture } from './shared/integration';

const { expect } = require('chai');
const { ethers } = require('hardhat');

const ipfsPrefix = 'ipfs://';
const demoUrl1 =  ipfsPrefix + 'demo1';

describe('ERC721', function () {
  let users: Wallet[];
  let erc721: TokenERC721;
  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;
  
  before('create fixture loader', async () => {
    users = await (ethers as any).getSigners();
    loadFixture = waffle.createFixtureLoader(users);
  });
  
  beforeEach('deploy fixture', async () => {
    ({ erc721 } = await loadFixture(integrationFixture));
    // Mint two new tokens
    await erc721.connect(users[0]).safeMint(users[0].address,  demoUrl1);
  });

  it('Should airdrop a new ERC721 token and get its balance', async function () {
    expect(await erc721.balanceOf(users[0].address)).to.equal(1);
  });

});