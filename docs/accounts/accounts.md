# Accounts

The AccountsApi class provides methods to interact with accounts on the Bolt platform. This section covers how to use the SDK to:

* Retrieve account transfers
* Retrieve account balances
* Create a new account

## Importing AccountsApi

To get started, import the AccountsApi and Configuration classes from the lightlink-bolt-sdk package.

```typescript
import { Configuration, AccountsApi } from 'lightlink-bolt-sdk';
```

## Initializing the SDK

Set up the configuration with your API key and base path. Then, create an instance of AccountsApi using this configuration.

```typescript
const config = new Configuration({
  basePath: 'https://bolt-v2.lightlink.io',
  apiKey: 'YOUR_API_KEY',
});

const accountsApi = new AccountsApi(config);
```

## Methods

### 1. Get Account Transfers

Retrieve a paginated list of token transfers for a specific account address.

#### Method Signature

```typescript
accountsApi.getAccountTransfers(
  address: string,
  pageSize?: number,
  pageNumber?: number
): Promise<ITokenTransferListResponse>
```

#### Parameters
* `address`: The account address to retrieve transfers for.
* `pageSize` (optional): The number of transfers per page (default is 10).
* `pageNumber` (optional): The page number to retrieve (default is 0).

#### Example Usage

```typescript
const getAccountTransfers = async () => {
  const address = '0xYourAccountAddress'; // Replace with the target account address
  const pageSize = 10;                    // Number of transfers per page
  const pageNumber = 0;                   // Page number to retrieve

  try {
    const transfers = await accountsApi.getAccountTransfers(address, pageSize, pageNumber);
    console.log('Account Transfers:', transfers);
  } catch (error) {
    console.error('Error fetching account transfers:', error);
  }
};

getAccountTransfers();
```

#### Response Structure
The response is an object of type `ITokenTransferListResponse`, which includes:
* `page_size`: Number of items per page.
* `page`: Current page number.
* `total_items`: Total number of items available.
* `items`: Array of token transfer records.

### 2. Get Account Balances

Retrieve a paginated list of token balances for a specific account address.

#### Method Signature

```typescript
accountsApi.getAccountBalances(
  address: string,
  pageSize?: number,
  pageNumber?: number
): Promise<ITokenAccountListResponse>
```

#### Parameters
* `address`: The account address to retrieve balances for.
* `pageSize` (optional): The number of balances per page (default is 10).
* `pageNumber` (optional): The page number to retrieve (default is 0).

#### Example Usage

```typescript
const getAccountBalances = async () => {
  const address = '0xYourAccountAddress'; // Replace with the target account address
  const pageSize = 10;                    // Number of balances per page
  const pageNumber = 0;                   // Page number to retrieve

  try {
    const balances = await accountsApi.getAccountBalances(address, pageSize, pageNumber);
    console.log('Account Balances:', balances);
  } catch (error) {
    console.error('Error fetching account balances:', error);
  }
};

getAccountBalances();
```

#### Response Structure
The response is an object of type `ITokenAccountListResponse`, which includes:
* `page_size`: Number of items per page.
* `page`: Current page number.
* `total_items`: Total number of items available.
* `items`: Array of token account records.

### 3. Create an Account

Create a new account within your organisation.

#### Method Signature

```typescript
accountsApi.createAccount(
  accountData: ICreateAccount
): Promise<IAccount>
```

#### Parameters
* `accountData`: An object containing the account details.
  * `type`: The type of account. Options are 'MANAGED' or 'EXTERNALLY_OWNED'.
  * `external_ref`: A unique external reference for your account (e.g., a user ID from your system).

#### Example Usage

```typescript
import { AccountType, ICreateAccount } from 'lightlink-bolt-sdk';

const createAccount = async () => {
  const accountData: ICreateAccount = {
    type: AccountType.MANAGED,         // AccountType.MANAGED or AccountType.EXTERNALLY_OWNED
    external_ref: 'your-external-ref', // Your unique external reference
  };

  try {
    const account = await accountsApi.createAccount(accountData);
    console.log('Account Created:', account);
  } catch (error) {
    console.error('Error creating account:', error);
  }
};

createAccount();
```

#### Response Structure
The response is an object of type `IAccount`, which includes:
* `key`: Unique identifier for the account.
* `type`: The account type ('MANAGED' or 'EXTERNALLY_OWNED').
* `external_ref`: The external reference provided.
* `address`: The blockchain address associated with the account.
* `organisation_key`: The key of the organisation the account belongs to.
* `created`: Timestamp of account creation.
* `modified`: Timestamp of last modification.
* `removed`: Indicates if the account has been removed.

## Additional Notes

* **Authentication**: Ensure that you have set up your API key correctly in the configuration. All methods require proper authentication.
* **Error Handling**: Always include error handling to catch and manage exceptions that may occur during API calls.
* **Pagination**: Use pageSize and pageNumber parameters to navigate through paginated results.

## Common Types

### ITokenTransferListResponse
Represents a paginated list of token transfers.

```typescript
interface ITokenTransferListResponse {
  page_size: number;
  page: number;
  total_items: number;
  items: ITokenTransfer[];
}
```

### ITokenTransfer
Represents a single token transfer record.

```typescript
interface ITokenTransfer {
  key: string;
  hash: string;
  contract: string;
  from_address: string;
  to_address: string;
  organisation_key: string;
  amount: number;
  token_id?: number;
  created: string;
  modified: string;
  removed: boolean;
}
```

### ITokenAccountListResponse
Represents a paginated list of token accounts (balances).

```typescript
interface ITokenAccountListResponse {
  page_size: number;
  page: number;
  total_items: number;
  items: ITokenAccount[];
}
```

### ITokenAccount
Represents a token account balance.

```typescript
interface ITokenAccount {
  key: string;
  contract: string;
  owner: string;
  organisation_key: string;
  token_id?: number;
  balance_raw: string;
  balance: number;
  created: string;
  modified: string;
  removed: boolean;
}
```

### IAccount
Represents an account object.

```typescript
interface IAccount {
  key: string;
  type: 'MANAGED' | 'EXTERNALLY_OWNED';
  external_ref: string;
  address: string;
  organisation_key: string;
  encryption?: IEncryption;
  created: string;
  modified: string;
  removed: boolean;
}
```

### ICreateAccount
Data required to create a new account.

```typescript
interface ICreateAccount {
  type: 'MANAGED' | 'EXTERNALLY_OWNED';
  external_ref: string;
}
```