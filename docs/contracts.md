# Contracts

The ContractsApi class in the lightlink-bolt-sdk allows you to manage and interact with smart contracts on the Bolt platform. This section covers how to:

* Retrieve a list of contracts
* Add a new contract
* Deploy a new contract
* Add a webhook to a contract
* Read data from a contract

**Note**: For interactions with token-type contracts (like ERC20, ERC721, and ERC1155), you can perform specific operations via the Tokens API.

## Table of Contents
- [Importing ContractsApi](#importing-contractsapi)
- [Initializing the SDK](#initializing-the-sdk)
- [Methods](#methods)
  - [Get Filtered Contracts](#1-get-filtered-contracts)
  - [Add a Contract](#2-add-a-contract)
  - [Deploy a Contract](#3-deploy-a-contract)
  - [Add a Webhook to a Contract](#4-add-a-webhook-to-a-contract)
  - [Read from a Contract](#5-read-from-a-contract)
- [Common Types](#common-types)
- [Next Steps](#next-steps)

## Importing ContractsApi

To begin, import the ContractsApi and Configuration classes from the lightlink-bolt-sdk package.

```typescript
import { Configuration, ContractsApi } from 'lightlink-bolt-sdk';
```

## Initializing the SDK

Set up the configuration with your API key and base path. Then, create an instance of ContractsApi using this configuration.

```typescript
const config = new Configuration({
  basePath: 'https://bolt-v2.lightlink.io',
  apiKey: 'YOUR_API_KEY',
});

const contractsApi = new ContractsApi(config);
```

## Methods

### 1. Get Filtered Contracts

Retrieve a paginated list of contracts filtered by type.

#### Method Signature
```typescript
contractsApi.getFilteredContracts(
  type?: ContractType,
  pageSize?: number,
  pageNumber?: number
): Promise<IContractsListResponse>
```

#### Parameters
* `type` (optional): Filter contracts by type ('ERC20', 'ERC721', 'ERC1155', 'CUSTOM').
* `pageSize` (optional): Number of contracts per page (default is 10).
* `pageNumber` (optional): Page number to retrieve (default is 0).

#### Example Usage
```typescript
import { ContractType } from 'lightlink-bolt-sdk';

const getFilteredContracts = async () => {
  const type = ContractType.ERC20; // Filter by ERC20 contracts
  const pageSize = 10;
  const pageNumber = 0;

  try {
    const contracts = await contractsApi.getFilteredContracts(type, pageSize, pageNumber);
    console.log('Filtered Contracts:', contracts);
  } catch (error) {
    console.error('Error fetching contracts:', error);
  }
};

getFilteredContracts();
```

#### Response Structure
Returns an object of type `IContractsListResponse`, which includes:
* `page_size`: Number of items per page.
* `page`: Current page number.
* `total_items`: Total number of items available.
* `items`: Array of contract records.

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

### 4. Add a Webhook to a Contract

Add a webhook to a contract to receive notifications when certain events occur.

#### Method Signature
```typescript
contractsApi.webhook(
  contractAddress: string,
  webhookData: IPostCreateWebhook
): Promise<any>
```

#### Parameters
* `contractAddress`: The address of the contract to add the webhook to.
* `webhookData`: An object containing the webhook details.
  * `url`: The URL where webhook notifications should be sent.

#### Example Usage
```typescript
import { IPostCreateWebhook } from 'lightlink-bolt-sdk';

const addWebhook = async () => {
  const contractAddress = '0xContractAddress';
  const webhookData: IPostCreateWebhook = {
    url: 'https://yourapp.com/webhook-endpoint',
  };

  try {
    const response = await contractsApi.webhook(contractAddress, webhookData);
    console.log('Webhook Added:', response);
  } catch (error) {
    console.error('Error adding webhook:', error);
  }
};

addWebhook();
```

#### Response Structure
Returns an object containing details about the added webhook.

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

## Common Types

### IContractsListResponse
Represents a paginated list of contracts.

```typescript
interface IContractsListResponse {
  page_size: number;
  page: number;
  total_items: number;
  items: IContract[];
}
```

### IContract
Represents a contract object.

```typescript
interface IContract {
  key: string;
  address: string;
  metadata: IContractMetadata;
  abi: any[];
  active: boolean;
  type: ContractType;
  organisation_key: string;
  created: string;
  modified: string;
  removed: boolean;
}
```

### IContractMetadata
Metadata associated with a contract.

```typescript
interface IContractMetadata {
  name: string;
  description?: string;
  symbol?: string;
  image?: string;
  banner_image?: string;
}
```

### IPostContract
Data required to add an existing contract.

```typescript
interface IPostContract {
  address: string;
  metadata: IContractMetadata;
  abi: any[];
}
```

### IDeployContract
Data required to deploy a new contract.

```typescript
interface IDeployContract {
  metadata: IContractMetadata;
  type: ContractType;
}
```

### ContractType
Enumeration of contract types.

```typescript
enum ContractType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  CUSTOM = 'CUSTOM',
}
```

### IPostCreateWebhook
Data required to create a webhook.

```typescript
interface IPostCreateWebhook {
  url: string;
}
```

### IPostReadContract
Data required to read from a contract.

```typescript
interface IPostReadContract {
  function_name: string;
  args: any[];
}
```

### IReadContractResponse
Response from reading a contract.

```typescript
interface IReadContractResponse {
  result: any;
}
```

## Next Steps

* For token-specific interactions (like minting, transferring tokens), refer to the Tokens API.
* Explore other sections like Executions to execute contract functions and monitor their statuses.
* Check the API Reference for detailed information on all available methods and data structures.
* Feel free to reach out to our support team if you have any questions or need further assistance.