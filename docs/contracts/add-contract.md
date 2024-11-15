### 2. Add a Contract

Add an existing contract to your organisation's list of contracts.

#### Method Signature
```typescript
contractsApi.addContract(
  contractData: IPostContract
): Promise<IContract>
```

#### Parameters
* `contractData`: An object containing the contract details.
  * `address`: The blockchain address of the contract.
  * `metadata`: Metadata about the contract (name, description, symbol, etc.).
  * `abi`: The ABI (Application Binary Interface) of the contract.

#### Example Usage
```typescript
import { IPostContract, IContractMetadata } from 'lightlink-bolt-sdk';

const addContract = async () => {
  const contractAddress = '0xExistingContractAddress';
  const metadata: IContractMetadata = {
    name: 'My Existing Contract',
    description: 'Description of the contract',
    symbol: 'MEC',
    image: 'https://example.com/logo.png',
    banner_image: 'https://example.com/banner.png',
  };

  const abi = [/* ABI Array */];

  const contractData: IPostContract = {
    address: contractAddress,
    metadata,
    abi,
  };

  try {
    const contract = await contractsApi.addContract(contractData);
    console.log('Contract Added:', contract);
  } catch (error) {
    console.error('Error adding contract:', error);
  }
};

addContract();
```

#### Response Structure
Returns an object of type `IContract`, which includes details about the added contract.
