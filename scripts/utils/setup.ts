import * as ethers from 'ethers';
import * as dotenv  from 'dotenv';
import { networks } from '../../helpers/networks';
import { TokenERC20, TokenERC721, TokenERC1155 } from '../../dist/types';

dotenv.config();

console.log('Running... ', process.env.NETWORK);

const erc20 = require(`../../deployments/${process.env.NETWORK}/TokenERC20.json`);
const erc721 = require(`../../deployments/${process.env.NETWORK}/TokenERC721.json`);
const erc1155 = require(`../../deployments/${process.env.NETWORK}/TokenERC1155.json`);

export const deployments = {
  erc20,
  erc721,
  erc1155,
};

const rpcUrl = networks[process.env.NETWORK || ''].url;
const provider = ethers.getDefaultProvider(rpcUrl);

export const wallet = new ethers.Wallet(networks[process.env.NETWORK || '0'].accounts[0], provider);

export const getContracts = () => {
  return {
    erc20: new ethers.Contract(erc20.address, erc20.abi, wallet) as TokenERC20,
    erc721: new ethers.Contract(erc721.address, erc721.abi, wallet) as TokenERC721,
    erc1155: new ethers.Contract(erc1155.address, erc1155.abi, wallet) as TokenERC1155,
  };
};

export const txConfig = {
  gasPrice: networks[process.env.NETWORK || ''].gasPrice !== undefined ? networks[process.env.NETWORK || ''].gasPrice : undefined,
  gasLimit: 10000000,
};