### 3. Deploy a Contract

Deploy a new contract to the blockchain.

#### Method Signature
```typescript
contractsApi.deployContract(
  contractData: IDeployContract
): Promise<IContract>
```

#### Parameters
* `contractData`: An object containing the deployment details.
  * `metadata`: Metadata about the contract (name, description, symbol, etc.).
  * `type`: The type of contract to deploy ('ERC20', 'ERC721', 'ERC1155', 'CUSTOM').

#### Example Usage
```typescript
import { IDeployContract, ContractType, IContractMetadata } from 'lightlink-bolt-sdk';

const deployContract = async () => {
  const metadata: IContractMetadata = {
    name: 'My New Token',
    description: 'An ERC20 token',
    symbol: 'MNT',
  };

  const contractData: IDeployContract = {
    metadata,
    type: ContractType.ERC20,
  };

  try {
    const contract = await contractsApi.deployContract(contractData);
    console.log('Contract Deployed:', contract);
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
};

deployContract();
```

#### Response Structure
Returns an object of type `IContract`, which includes details about the deployed contract.
