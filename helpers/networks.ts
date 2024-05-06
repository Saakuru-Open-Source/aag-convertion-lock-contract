import * as dotenv from 'dotenv';
import { decrypt } from '../scripts/encrypt';

// @ts-ignore
dotenv.config();

const privateKeyEncrypted = process.env.WLT;
const password = process.env.KEY;
const salt = process.env.SALT;

const privateKey = decrypt(privateKeyEncrypted, password, salt);


export const testnets = {
  saakuruTestnet:{
    url: 'https://rpc-testnet.saakuru.network',
    chainId: 247253,
    accounts: [`0x${privateKey}`],
    live: true,
    saveDeployments: true,
    gasPrice: 0,
  },
  bscTestnet: {
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    chainId: 97,
    accounts: [`0x${privateKey}`],
    live: true,
    saveDeployments: true,
  },
  baseTestnet: {
    url: 'https://sepolia.base.org',
    accounts: [`0x${privateKey}`],
    chainId: 84532,
    live: true,
    saveDeployments: true,
  },
  optimismTestnet: {
    url: 'https://endpoints.omniatech.io/v1/op/sepolia/public',
    accounts: [`0x${privateKey}`],
    chainId: 11155420,
    live: true,
    saveDeployments: true,
  },
  harmonyTestnet: {
    url: 'https://api.s0.b.hmny.io',
    chainId: 1666700000,
    accounts: [`0x${privateKey}`],
    live: true,
    saveDeployments: true,
  },
};

export const networks = {
  saakuruMainnet:{
    url: 'https://rpc.saakuru.network',
    accounts: [`0x${privateKey}`],
    chainId: 7225878,
    live: true,
    saveDeployments: true,
    gasPrice: 0,
  },
  bscMainnet: {
    url: 'https://bsc-dataseed1.ninicoin.io',
    chainId: 56,
    accounts: [`0x${privateKey}`],
    live: true,
    saveDeployments: true,
  },
  baseMainnet: {
    url: 'https://mainnet.base.org',
    accounts: [`0x${privateKey}`],
    chainId: 8453,
    live: true,
    saveDeployments: true,
  },
  optimismMainnet: {
    url: 'https://mainnet.optimism.io',
    accounts: [`0x${privateKey}`],
    chainId: 10,
    live: true,
    saveDeployments: true,
  },
  ethereumMainnet: {
    url: 'https://ethereum-rpc.publicnode.com',
    accounts: [`0x${privateKey}`],
    chainId: 1,
    live: true,
    saveDeployments: true,
  },
  polygonMainnet: {
    url: 'https://1rpc.io/matic',
    accounts: [`0x${privateKey}`],
    chainId: 137,
    live: true,
    saveDeployments: true,
    gasPrice: 90000000000,
  },
  avalancheMainnet: {
    url: 'https://api.avax.network/ext/bc/C/rpc',
    accounts: [`0x${privateKey}`],
    chainId: 43114,
    live: true,
    saveDeployments: true,
  },
  arbitrumMainnet: {
    url: 'https://arbitrum-one-rpc.publicnode.com',
    accounts: [`0x${privateKey}`],
    chainId: 42161,
    live: true,
    saveDeployments: true,
  },
  harmonyMainnet: {
    url: 'https://api.harmony.one',
    chainId: 1666600000,
    accounts: [`0x${privateKey}`],
    live: true,
    saveDeployments: true,
  },
  ...testnets,
};

export const tokensAddresses = {
  '1': '0x5ba19d656b65f1684cfea4af428c23b9f3628f97',
  '8453': '0x96e890c6b2501a69cad5dba402bfb871a2a2874c',
  '1666600000': '0xae0609a062a4eaed49de28c5f6a193261e0150ea',
  '1666700000': '0x8C66D611540D464A009C96B4b5a2e428283217B8',
};