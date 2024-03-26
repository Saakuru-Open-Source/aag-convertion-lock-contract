import * as dotenv  from 'dotenv';
import { getContracts, txConfig } from './utils/setup';
import { BigNumber } from 'ethers';

dotenv.config();

console.log('Running... ', process.env.NETWORK);

const main = async () => {

  const contracts = getContracts();

  const tx = await contracts.erc20Lock.crossChainConvertERC20(BigNumber.from(1), "0x", txConfig);
  console.log(await tx.wait());

};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
