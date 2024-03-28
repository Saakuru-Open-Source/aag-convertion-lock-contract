import * as ethers from 'ethers';
import * as dotenv  from 'dotenv';
import { networks } from '../../helpers/networks';
import { ERC20Lock } from '../../dist/types';

dotenv.config();

console.log('Running... ', process.env.NETWORK);

const erc20Lock = require(`../../deployments/${process.env.NETWORK}/ERC20Lock.json`);

export const deployments = {
  erc20Lock,
};

const rpcUrl = networks[process.env.NETWORK || ''].url;
const provider = ethers.getDefaultProvider(rpcUrl);

export const wallet = new ethers.Wallet(networks[process.env.NETWORK || '0'].accounts[0], provider);

export const getContracts = () => {
  return {
    erc20Lock: new ethers.Contract(erc20Lock.address, erc20Lock.abi, wallet) as ERC20Lock,
  };
};

export const txConfig = {
  gasPrice: networks[process.env.NETWORK || ''].gasPrice !== undefined ? networks[process.env.NETWORK || ''].gasPrice : undefined,
  gasLimit: 10000000,
};