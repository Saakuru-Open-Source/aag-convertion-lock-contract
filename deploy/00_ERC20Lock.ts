import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { tokensAddresses } from '../helpers/networks';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const chainId = await hre.getChainId();

  const tokenAddress = tokensAddresses[chainId];
  if (!tokenAddress) {
    throw new Error('Token address not found');
  }

  await deploy('ERC20Lock', {
    from: deployer,
    args: [
      tokenAddress,
    ],
    log: true,
    skipIfAlreadyDeployed: true,
    contract: 'ERC20Lock',
  });
};

export default func;
func.id = 'ERC20Lock';
func.tags = ['hardhat', 'v1'];
func.dependencies = [];
