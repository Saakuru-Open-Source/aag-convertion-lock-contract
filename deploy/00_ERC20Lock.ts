import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import config from '../config';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy('ERC20Lock', {
    from: deployer,
    args: [
      config.TOKEN_ADDRESS,
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
