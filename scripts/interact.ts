import * as dotenv  from 'dotenv';
import { getContracts, txConfig } from './utils/setup';
import { BigNumber } from 'ethers';

dotenv.config();

console.log('Running... ', process.env.NETWORK);

const main = async () => {

  const contracts = getContracts();
  
  const tx = await contracts.erc20Lock.crossChainConvertERC20(BigNumber.from(10).pow(18).mul(100), '0x5Bd3a83Af82abf123A66294A38d3C5305c6164dd', txConfig);
  console.log(await tx.wait());

};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
