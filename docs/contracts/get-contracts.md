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
