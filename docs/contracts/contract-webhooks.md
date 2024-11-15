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
