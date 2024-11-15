# Contract Executions

The `ExecutionsApi` class in the `lightlink-bolt-sdk` allows you to execute functions on smart contracts and monitor the execution status. This section covers how to:

- Retrieve a list of contract executions
- Execute a contract function
- Retrieve execution details by key

---

## Table of Contents

- [Importing ExecutionsApi](#importing-executionsapi)
- [Initializing the SDK](#initializing-the-sdk)
- [Methods](#methods)
  - [Get Executions](#1-get-executions)
  - [Execute a Contract Function](#2-execute-a-contract-function)
  - [Get Execution by Key](#3-get-execution-by-key)
- [Common Types](#common-types)
- [Next Steps](#next-steps)

---

## Importing ExecutionsApi

To begin, import the `ExecutionsApi` and `Configuration` classes from the `lightlink-bolt-sdk` package.

```typescript
import { Configuration, ExecutionsApi } from 'lightlink-bolt-sdk';
```

## Initializing the SDK

Set up the configuration with your API key and base path. Then, create an instance of `ExecutionsApi` using this configuration.

```typescript
const config = new Configuration({
  basePath: 'https://bolt-v2.lightlink.io',
  apiKey: 'YOUR_API_KEY',
});

const executionsApi = new ExecutionsApi(config);
```

---

## Methods

### 1. Get Executions

Retrieve a paginated list of contract executions, optionally filtered by contract address and status.

#### Method Signature

```typescript
executionsApi.getExecutions(
  limit: number,
  offset: number,
  contract_address?: string,
  status?: string
): Promise<IContractExecutionListResponse>
```

#### Parameters

- **limit**: The number of executions to retrieve.
- **offset**: The offset from the beginning of the executions list.
- **contract_address** (optional): Filter executions by contract address.
- **status** (optional): Filter executions by status (`'PENDING'`, `'SUCCESS'`, `'FAILED'`).

#### Example Usage

```typescript
const getExecutions = async () => {
  const limit = 10;                       // Number of executions to retrieve
  const offset = 0;                       // Offset from the beginning
  const contractAddress = '0xContractAddress'; // Optional contract address filter
  const status = 'SUCCESS';               // Optional status filter ('PENDING', 'SUCCESS', 'FAILED')

  try {
    const executions = await executionsApi.getExecutions(limit, offset, contractAddress, status);
    console.log('Executions:', executions);
  } catch (error) {
    console.error('Error fetching executions:', error);
  }
};

getExecutions();
```

#### Response Structure

Returns an object of type `IContractExecutionListResponse`, which includes:

- **page_size**: Number of items per page.
- **page**: Current page number.
- **total_items**: Total number of items available.
- **items**: Array of contract execution records.

---

### 2. Execute a Contract Function

Execute a function on a deployed smart contract.

#### Method Signature

```typescript
executionsApi.executeContract(
  executionData: IPostContractExecution
): Promise<IContractExecutionResponse>
```

#### Parameters

- **executionData**: An object containing the execution details.

  - **contract_address**: The blockchain address of the contract.
  - **function_name**: The name of the contract function to execute.
  - **args**: An array of arguments to pass to the function.
  - **user_id** (optional): The user ID or account key initiating the execution.

#### Example Usage

```typescript
import { IPostContractExecution } from 'lightlink-bolt-sdk';

const executeContractFunction = async () => {
  const executionData: IPostContractExecution = {
    contract_address: '0xContractAddress',
    function_name: 'transfer',
    args: ['0xRecipientAddress', 1000],
    user_id: 'user-key', // Optional: Specify the user initiating the execution
  };

  try {
    const execution = await executionsApi.executeContract(executionData);
    console.log('Execution Result:', execution);
  } catch (error) {
    console.error('Error executing contract function:', error);
  }
};

executeContractFunction();
```

#### Response Structure

Returns an `IContractExecutionResponse` object containing details about the execution:

- **key**: Unique identifier for the execution.
- **status**: The current status of the execution (`'PENDING'`, `'SUCCESS'`, `'FAILED'`).
- **transaction_hash**: The transaction hash if the execution was successful.
- **block_number**: The block number if the execution was successful.
- **error_message**: Error message if the execution failed.
- **created**: Timestamp of execution creation.
- **modified**: Timestamp of last modification.

---

### 3. Get Execution by Key

Retrieve details of a specific contract execution by its unique key.

#### Method Signature

```typescript
executionsApi.getExecutionByKey(
  key: string
): Promise<IContractExecution>
```

#### Parameters

- **key**: The unique identifier of the execution.

#### Example Usage

```typescript
const getExecutionByKey = async () => {
  const key = 'execution-key'; // Replace with the actual execution key

  try {
    const execution = await executionsApi.getExecutionByKey(key);
    console.log('Execution Details:', execution);
  } catch (error) {
    console.error('Error fetching execution details:', error);
  }
};

getExecutionByKey();
```

#### Response Structure

Returns an `IContractExecution` object containing details about the execution:

- **key**: Unique identifier for the execution.
- **status**: The current status of the execution (`'PENDING'`, `'SUCCESS'`, `'FAILED'`).
- **transaction_hash**: The transaction hash if the execution was successful.
- **block_number**: The block number if the execution was successful.
- **error_message**: Error message if the execution failed.
- **created**: Timestamp of execution creation.
- **modified**: Timestamp of last modification.

---

## Common Types

### IPostContractExecution

Parameters required to execute a contract function.

```typescript
interface IPostContractExecution {
  contract_address: string;
  function_name: string;
  args: any[];
  user_id?: string;
}
```

### IContractExecutionResponse

Represents the response after initiating a contract execution.

```typescript
interface IContractExecutionResponse {
  key: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  transaction_hash?: string;
  block_number?: number;
  error_message?: string;
  created: string;
  modified: string;
}
```

### IContractExecution

Represents the details of a contract execution.

```typescript
interface IContractExecution {
  key: string;
  contract_address: string;
  function_name: string;
  args: any[];
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  transaction_hash?: string;
  block_number?: number;
  error_message?: string;
  user_id?: string;
  created: string;
  modified: string;
}
```

### IContractExecutionListResponse

Represents a paginated list of contract executions.

```typescript
interface IContractExecutionListResponse {
  page_size: number;
  page: number;
  total_items: number;
  items: IContractExecution[];
}
```

---

## Next Steps

- Explore other sections like [Contracts](contracts.md) and [Tokens](tokens.md) to interact with smart contracts and tokens using the SDK.
- Implement error handling and input validation in your application to ensure robust interactions with the API.

---

Feel free to reach out to our support team if you have any questions or need further assistance.