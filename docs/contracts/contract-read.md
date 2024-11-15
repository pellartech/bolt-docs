### 5. Read from a Contract

Read data from a contract by calling a read-only function.

#### Method Signature
```typescript
contractsApi.readContract(
  address: string,
  argsData: IPostReadContract
): Promise<IReadContractResponse>
```

#### Parameters
* `address`: The blockchain address of the contract.
* `argsData`: An object containing the function name and arguments.
  * `function_name`: The name of the contract function to call.
  * `args`: An array of arguments to pass to the function.

#### Example Usage
```typescript
import { IPostReadContract } from 'lightlink-bolt-sdk';

const readContract = async () => {
  const contractAddress = '0xContractAddress';
  const argsData: IPostReadContract = {
    function_name: 'balanceOf',
    args: ['0xAddressToCheck'],
  };

  try {
    const result = await contractsApi.readContract(contractAddress, argsData);
    console.log('Contract Read Result:', result);
  } catch (error) {
    console.error('Error reading contract:', error);
  }
};

readContract();
```

#### Response Structure
Returns an object of type `IReadContractResponse`, which includes:
* `result`: The result returned by the contract function.
