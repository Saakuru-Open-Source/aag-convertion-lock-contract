import * as dotenv from 'dotenv';
import { decrypt } from '../scripts/encrypt';

// @ts-ignore
dotenv.config();

const privateKeyEncrypted = process.env.WLT;
const password = process.env.KEY;
const salt = process.env.SALT;

const privateKey = decrypt(privateKeyEncrypted, password, salt);

export const networks = {
  saakuruTestnet: {
    url: 'https://rpc-testnet.saakuru.network',
    chainId: 247253,
    accounts: [`0x${privateKey}`],
    live: true,
    saveDeployments: true,
    gasPrice: 0,
  },
  saakuruMainnet: {
    url: 'https://rpc.saakuru.network',
    accounts: [`0x${privateKey}`],
    chainId: 7225878,
    live: true,
    saveDeployments: true,
    gasPrice: 0,
  },
  harmonyTestnet: {
    url: 'https://api.s0.b.hmny.io',
    chainId: 1666700000,
    accounts: [`0x${privateKey}`],
    live: true,
    saveDeployments: true,
    gasPrice: 1000000000, // Example gas price, adjust as needed
  },
  harmonyMainnet: {
    url: 'https://api.harmony.one',
    chainId: 1666600000,
    accounts: [`0x${privateKey}`],
    live: true,
    saveDeployments: true,
    gasPrice: 1000000000, // Example gas price, adjust as needed
  },
  ethereumMainnet: {
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    accounts: [`0x${privateKey}`],
    chainId: 1,
    live: true,
    saveDeployments: true,
  },
  ethereumGoerli: {
    url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
    accounts: [`0x${privateKey}`],
    chainId: 5,
    live: true,
    saveDeployments: true,
  },
};
