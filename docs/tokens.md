# Tokens

The `TokensApi` class in the `lightlink-bolt-sdk` allows you to interact with tokens on the Bolt platform. This includes functionalities like:

- Retrieving and updating NFT metadata
- Minting tokens (ERC20, ERC721, ERC1155)
- Transferring tokens
- Fetching token transfers and balances

---

## Table of Contents

- [Importing TokensApi](#importing-tokensapi)
- [Initializing the SDK](#initializing-the-sdk)
- [Methods](#methods)
  - [NFT Metadata](#nft-metadata)
    - [Get NFT Metadata](#1-get-nft-metadata)
    - [Create NFT Metadata](#2-create-nft-metadata)
    - [Update NFT Metadata](#3-update-nft-metadata)
  - [Minting Tokens](#minting-tokens)
    - [Mint ERC20 Token](#4-mint-erc20-token)
    - [Mint ERC721 Token](#5-mint-erc721-token)
    - [Mint ERC1155 Token](#6-mint-erc1155-token)
  - [Token Transfers and Balances](#token-transfers-and-balances)
    - [Get Token Transfers](#7-get-token-transfers)
    - [Get Token Balances](#8-get-token-balances)
  - [Transferring Tokens](#transferring-tokens)
    - [Transfer ERC20 Token](#9-transfer-erc20-token)
    - [Transfer ERC721 Token](#10-transfer-erc721-token)
    - [Transfer ERC1155 Token](#11-transfer-erc1155-token)
- [Common Types](#common-types)
- [Next Steps](#next-steps)

---

## Importing TokensApi

To begin, import the `TokensApi` and `Configuration` classes from the `lightlink-bolt-sdk` package.

```typescript
import { Configuration, TokensApi } from 'lightlink-bolt-sdk';
```

## Initializing the SDK

Set up the configuration with your API key and base path. Then, create an instance of `TokensApi` using this configuration.

```typescript
const config = new Configuration({
  basePath: 'https://bolt-v2.lightlink.io',
  apiKey: 'YOUR_API_KEY',
});

const tokensApi = new TokensApi(config);
```

---

## Methods

### NFT Metadata

#### 1. Get NFT Metadata

Retrieve the metadata of an NFT by its contract address and token ID.

##### Method Signature

```typescript
tokensApi.getNFTMetadata(
  contractAddress: string,
  tokenId: number
): Promise<INFTMetadata>
```

##### Parameters

- **contractAddress**: The blockchain address of the NFT contract.
- **tokenId**: The ID of the token whose metadata you want to retrieve.

##### Example Usage

```typescript
const getNFTMetadata = async () => {
  const contractAddress = '0xContractAddress';
  const tokenId = 1;

  try {
    const metadata = await tokensApi.getNFTMetadata(contractAddress, tokenId);
    console.log('NFT Metadata:', metadata);
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
  }
};

getNFTMetadata();
```

##### Response Structure

Returns an object of type `INFTMetadata`, which includes:

- **name**: Name of the NFT.
- **description**: Description of the NFT.
- **image**: URL to the NFT image.
- **attributes**: Array of attributes associated with the NFT.

---

#### 2. Create NFT Metadata

Create metadata for an NFT. This is useful when minting a new NFT and associating metadata with it.

##### Method Signature

```typescript
tokensApi.postNFTMetadata(
  contractAddress: string,
  tokenId: number,
  metadata: INFTMetadata
): Promise<INFTMetadata>
```

##### Parameters

- **contractAddress**: The blockchain address of the NFT contract.
- **tokenId**: The ID of the token for which you want to create metadata.
- **metadata**: An object containing the metadata details.

##### Example Usage

```typescript
import { INFTMetadata } from 'lightlink-bolt-sdk';

const createNFTMetadata = async () => {
  const contractAddress = '0xContractAddress';
  const tokenId = 1;
  const metadata: INFTMetadata = {
    name: 'My Unique NFT',
    description: 'Description of the NFT',
    image: 'https://example.com/nft.png',
    attributes: [
      {
        trait_type: 'Rarity',
        value: 'Rare',
      },
    ],
  };

  try {
    const result = await tokensApi.postNFTMetadata(contractAddress, tokenId, metadata);
    console.log('NFT Metadata Created:', result);
  } catch (error) {
    console.error('Error creating NFT metadata:', error);
  }
};

createNFTMetadata();
```

##### Response Structure

Returns the created `INFTMetadata` object.

---

#### 3. Update NFT Metadata

Update the metadata of an existing NFT.

##### Method Signature

```typescript
tokensApi.putNFTMetadata(
  contractAddress: string,
  tokenId: number,
  metadata: INFTMetadata
): Promise<INFTMetadata>
```

##### Parameters

- **contractAddress**: The blockchain address of the NFT contract.
- **tokenId**: The ID of the token whose metadata you want to update.
- **metadata**: An object containing the updated metadata details.

##### Example Usage

```typescript
import { INFTMetadata } from 'lightlink-bolt-sdk';

const updateNFTMetadata = async () => {
  const contractAddress = '0xContractAddress';
  const tokenId = 1;
  const metadata: INFTMetadata = {
    name: 'Updated NFT Name',
    description: 'Updated description',
    image: 'https://example.com/new-nft.png',
    attributes: [
      {
        trait_type: 'Level',
        value: '10',
      },
    ],
  };

  try {
    const result = await tokensApi.putNFTMetadata(contractAddress, tokenId, metadata);
    console.log('NFT Metadata Updated:', result);
  } catch (error) {
    console.error('Error updating NFT metadata:', error);
  }
};

updateNFTMetadata();
```

##### Response Structure

Returns the updated `INFTMetadata` object.

---

### Minting Tokens

#### 4. Mint ERC20 Token

Mint a specified amount of ERC20 tokens to a user's account.

##### Method Signature

```typescript
tokensApi.mintERC20Token(
  contractAddress: string,
  mintParams: IPostMintErc20
): Promise<IContractExecution>
```

##### Parameters

- **contractAddress**: The address of the ERC20 token contract.
- **mintParams**: An object containing the minting details.

  - **amount**: The amount of tokens to mint.
  - **user_id**: The user ID or account key to whom the tokens will be minted.

##### Example Usage

```typescript
import { IPostMintErc20 } from 'lightlink-bolt-sdk';

const mintERC20Token = async () => {
  const contractAddress = '0xContractAddress';
  const mintParams: IPostMintErc20 = {
    amount: 1000,
    user_id: 'user-key',
  };

  try {
    const result = await tokensApi.mintERC20Token(contractAddress, mintParams);
    console.log('ERC20 Token Minted:', result);
  } catch (error) {
    console.error('Error minting ERC20 token:', error);
  }
};

mintERC20Token();
```

##### Response Structure

Returns an `IContractExecution` object containing details about the minting transaction.

---

#### 5. Mint ERC721 Token

Mint an ERC721 token (NFT) to a user's account.

##### Method Signature

```typescript
tokensApi.mintERC721Token(
  contractAddress: string,
  mintParams: IPostMintErc721
): Promise<IContractExecution>
```

##### Parameters

- **contractAddress**: The address of the ERC721 token contract.
- **mintParams**: An object containing the minting details.

  - **metadata**: The metadata associated with the NFT.
  - **amount**: The number of tokens to mint (usually `1` for ERC721).
  - **user_id**: The user ID or account key to whom the token will be minted.

##### Example Usage

```typescript
import { IPostMintErc721, INFTMetadata } from 'lightlink-bolt-sdk';

const mintERC721Token = async () => {
  const contractAddress = '0xContractAddress';
  const metadata: INFTMetadata = {
    name: 'Unique NFT',
    description: 'This is a unique NFT',
    image: 'https://example.com/nft.png',
    attributes: [
      {
        trait_type: 'Level',
        value: 5,
      },
    ],
  };

  const mintParams: IPostMintErc721 = {
    metadata,
    amount: 1,
    user_id: 'user-key',
  };

  try {
    const result = await tokensApi.mintERC721Token(contractAddress, mintParams);
    console.log('ERC721 Token Minted:', result);
  } catch (error) {
    console.error('Error minting ERC721 token:', error);
  }
};

mintERC721Token();
```

##### Response Structure

Returns an `IContractExecution` object containing details about the minting transaction.

---

#### 6. Mint ERC1155 Token

Mint an ERC1155 token to a user's account.

##### Method Signature

```typescript
tokensApi.mintERC1155Token(
  contractAddress: string,
  mintParams: IPostMintErc1155
): Promise<IContractExecution>
```

##### Parameters

- **contractAddress**: The address of the ERC1155 token contract.
- **mintParams**: An object containing the minting details.

  - **metadata**: The metadata associated with the token.
  - **token_id**: The ID of the token to mint.
  - **amount**: The amount of tokens to mint.
  - **user_id**: The user ID or account key to whom the tokens will be minted.

##### Example Usage

```typescript
import { IPostMintErc1155, INFTMetadata } from 'lightlink-bolt-sdk';

const mintERC1155Token = async () => {
  const contractAddress = '0xContractAddress';
  const metadata: INFTMetadata = {
    name: 'Collectible Item',
    description: 'An ERC1155 collectible item',
    image: 'https://example.com/item.png',
    attributes: [
      {
        trait_type: 'Category',
        value: 'Collectible',
      },
    ],
  };

  const mintParams: IPostMintErc1155 = {
    metadata,
    token_id: 1001,
    amount: 10,
    user_id: 'user-key',
  };

  try {
    const result = await tokensApi.mintERC1155Token(contractAddress, mintParams);
    console.log('ERC1155 Token Minted:', result);
  } catch (error) {
    console.error('Error minting ERC1155 token:', error);
  }
};

mintERC1155Token();
```

##### Response Structure

Returns an `IContractExecution` object containing details about the minting transaction.

---

### Token Transfers and Balances

#### 7. Get Token Transfers

Retrieve a paginated list of token transfers for a specific token contract.

##### Method Signature

```typescript
tokensApi.getTokenTransfers(
  address: string,
  pageSize?: number,
  pageNumber?: number
): Promise<ITokenTransferListResponse>
```

##### Parameters

- **address**: The blockchain address of the token contract.
- **pageSize** (optional): Number of transfers per page (default is `10`).
- **pageNumber** (optional): Page number to retrieve (default is `0`).

##### Example Usage

```typescript
const getTokenTransfers = async () => {
  const address = '0xTokenContractAddress';
  const pageSize = 10;
  const pageNumber = 0;

  try {
    const transfers = await tokensApi.getTokenTransfers(address, pageSize, pageNumber);
    console.log('Token Transfers:', transfers);
  } catch (error) {
    console.error('Error fetching token transfers:', error);
  }
};

getTokenTransfers();
```

##### Response Structure

Returns an `ITokenTransferListResponse` object containing:

- **page_size**: Number of items per page.
- **page**: Current page number.
- **total_items**: Total number of items available.
- **items**: Array of token transfer records.

---

#### 8. Get Token Balances

Retrieve a paginated list of token balances for a specific token contract.

##### Method Signature

```typescript
tokensApi.getTokenBalances(
  address: string,
  pageSize?: number,
  pageNumber?: number
): Promise<ITokenAccountListResponse>
```

##### Parameters

- **address**: The blockchain address of the token contract.
- **pageSize** (optional): Number of balances per page (default is `10`).
- **pageNumber** (optional): Page number to retrieve (default is `0`).

##### Example Usage

```typescript
const getTokenBalances = async () => {
  const address = '0xTokenContractAddress';
  const pageSize = 10;
  const pageNumber = 0;

  try {
    const balances = await tokensApi.getTokenBalances(address, pageSize, pageNumber);
    console.log('Token Balances:', balances);
  } catch (error) {
    console.error('Error fetching token balances:', error);
  }
};

getTokenBalances();
```

##### Response Structure

Returns an `ITokenAccountListResponse` object containing:

- **page_size**: Number of items per page.
- **page**: Current page number.
- **total_items**: Total number of items available.
- **items**: Array of token account records.

---

### Transferring Tokens

#### 9. Transfer ERC20 Token

Transfer a specified amount of ERC20 tokens from one address to another.

##### Method Signature

```typescript
tokensApi.createErc20transfer(
  contractAddress: string,
  transferParams: IPostTransferErc20
): Promise<IContractExecution>
```

##### Parameters

- **contractAddress**: The address of the ERC20 token contract.
- **transferParams**: An object containing the transfer details.

  - **from**: The address sending the tokens.
  - **to**: The address receiving the tokens.
  - **amount**: The amount of tokens to transfer.

##### Example Usage

```typescript
import { IPostTransferErc20 } from 'lightlink-bolt-sdk';

const transferERC20Token = async () => {
  const contractAddress = '0xContractAddress';
  const transferParams: IPostTransferErc20 = {
    from: '0xSenderAddress',
    to: '0xRecipientAddress',
    amount: 500,
  };

  try {
    const result = await tokensApi.createErc20transfer(contractAddress, transferParams);
    console.log('ERC20 Token Transferred:', result);
  } catch (error) {
    console.error('Error transferring ERC20 token:', error);
  }
};

transferERC20Token();
```

##### Response Structure

Returns an `IContractExecution` object containing details about the transfer transaction.

---

#### 10. Transfer ERC721 Token

Transfer a specified ERC721 token from one address to another.

##### Method Signature

```typescript
tokensApi.createErc721Transfer(
  contractAddress: string,
  transferParams: IPostTransferErc721
): Promise<IContractExecution>
```

##### Parameters

- **contractAddress**: The address of the ERC721 token contract.
- **transferParams**: An object containing the transfer details.

  - **from**: The address sending the token.
  - **to**: The address receiving the token.
  - **tokenId**: The ID of the token to transfer.

##### Example Usage

```typescript
import { IPostTransferErc721 } from 'lightlink-bolt-sdk';

const transferERC721Token = async () => {
  const contractAddress = '0xContractAddress';
  const transferParams: IPostTransferErc721 = {
    from: '0xSenderAddress',
    to: '0xRecipientAddress',
    tokenId: 1,
  };

  try {
    const result = await tokensApi.createErc721Transfer(contractAddress, transferParams);
    console.log('ERC721 Token Transferred:', result);
  } catch (error) {
    console.error('Error transferring ERC721 token:', error);
  }
};

transferERC721Token();
```

##### Response Structure

Returns an `IContractExecution` object containing details about the transfer transaction.

---

#### 11. Transfer ERC1155 Token

Transfer a specified amount of an ERC1155 token from one address to another.

##### Method Signature

```typescript
tokensApi.createErc1155Transfer(
  contractAddress: string,
  transferParams: IPostTransferErc1155
): Promise<IContractExecution>
```

##### Parameters

- **contractAddress**: The address of the ERC1155 token contract.
- **transferParams**: An object containing the transfer details.

  - **from**: The address sending the tokens.
  - **to**: The address receiving the tokens.
  - **tokenId**: The ID of the token to transfer.
  - **amount**: The amount of tokens to transfer.

##### Example Usage

```typescript
import { IPostTransferErc1155 } from 'lightlink-bolt-sdk';

const transferERC1155Token = async () => {
  const contractAddress = '0xContractAddress';
  const transferParams: IPostTransferErc1155 = {
    from: '0xSenderAddress',
    to: '0xRecipientAddress',
    tokenId: 1001,
    amount: 5,
  };

  try {
    const result = await tokensApi.createErc1155Transfer(contractAddress, transferParams);
    console.log('ERC1155 Token Transferred:', result);
  } catch (error) {
    console.error('Error transferring ERC1155 token:', error);
  }
};

transferERC1155Token();
```

##### Response Structure

Returns an `IContractExecution` object containing details about the transfer transaction.

---

## Common Types

### INFTMetadata

Represents the metadata associated with an NFT.

```typescript
interface INFTMetadata {
  name: string;
  description?: string;
  image?: string;
  attributes?: INFTAttribute[];
}
```

### INFTAttribute

Represents an attribute of an NFT.

```typescript
interface INFTAttribute {
  trait_type?: string;
  value: string | number;
}
```

### IPostMintErc20

Parameters required to mint an ERC20 token.

```typescript
interface IPostMintErc20 {
  amount: number;
  user_id: string;
}
```

### IPostMintErc721

Parameters required to mint an ERC721 token.

```typescript
interface IPostMintErc721 {
  metadata: INFTMetadata;
  amount: number;
  user_id: string;
}
```

### IPostMintErc1155

Parameters required to mint an ERC1155 token.

```typescript
interface IPostMintErc1155 {
  metadata: INFTMetadata;
  token_id: number;
  amount: number;
  user_id: string;
}
```

### IPostTransferErc20

Parameters required to transfer an ERC20 token.

```typescript
interface IPostTransferErc20 {
  from: string;
  to: string;
  amount: number;
}
```

### IPostTransferErc721

Parameters required to transfer an ERC721 token.

```typescript
interface IPostTransferErc721 {
  from: string;
  to: string;
  tokenId: number;
}
```

### IPostTransferErc1155

Parameters required to transfer an ERC1155 token.

```typescript
interface IPostTransferErc1155 {
  from: string;
  to: string;
  tokenId: number;
  amount: number;
}
```

### IContractExecution

Represents the result of a contract execution.

```typescript
interface IContractExecution {
  key: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  transaction_hash?: string;
  block_number?: number;
  error_message?: string;
  created: string;
  modified: string;
  removed: boolean;
}
```

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
  contract: string;
  from_address: string;
  to_address: string;
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
  token_id?: number;
  balance_raw: string;
  balance: number;
  created: string;
  modified: string;
  removed: boolean;
}
```

---

## Next Steps

- Explore other sections like [Accounts](accounts.md) and [Contracts](contracts.md) to manage accounts and contracts using the SDK.
- Check the [API Reference](api-reference.md) for detailed information on all available methods and data structures.
- Implement error handling and input validation in your application to ensure robust interactions with the API.

---

Feel free to reach out to our support team if you have any questions or need further assistance.