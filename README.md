# Plurality Social Connect
This repo contains the functionality to load the plurality smart profile wallet as an embedded widget.

## To run
```
npm install && npm run start
```

## To use it in a react project

Here is a basic demo how it can be used in any react project
```
import { PluralitySocialConnect } from '@plurality-network/smart-profile-wallet';

const App = () => {

    const options = { cliendId: '', theme: 'light' };

    const handleDataReturned = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("dapp receives:", receivedData);
    };

    return (
        <div>
             <PluralitySocialConnect
                options={options}
                onDataReturned={handleDataReturned}
            />
        </div>
    );
};
```

### Options
There are three fields in the options object. 
`clientId` is the id that's specific to your application. If you use an empty clientId, it will pick up the default settings. However, if you want to customize the widget according to your own needs, then refer our [docs](https://docs.plurality.network) to find out the way to get your own clientId.
`theme` can be either light or dark.
`text` can be any text that will be displayed on the button. If you use an empty text, it will pick up the default text

 
## Calling web3 functions through the Smart Profile Wallet

Every web3 login solution needs to interact with the blockchain for carrying out various functions. Once the widget is embedded and the user connects their profile and a session is stored in the local storage, then plurality’s wallet solution provides the following standard web3 functions. To call them in your application, use the following code samples


### Get All Connected Accounts
Returns all accounts that have been connected through the social connect
```
(await PluralitySocialConnect.getAllAccounts()) as AllAccountsDataType;
Returns: [0x123…, 0x456…]
```

### Get Current Connected Account
Get current account connected to the social connect
```
(await PluralitySocialConnect.getConnectedAccount()) as ConnectedAccountDataType;
Returns: 0x123…
```

### Get Signature
Gets the message signed using the connected account and returns the signature
```
(await PluralitySocialConnect.getMessageSignature(message)) as SignMessageDataType;
```

### Verify Message Signature
Verify if the signature matches the message using the current connected account and returns boolean true or false
```
(await PluralitySocialConnect.verifyMessageSignature(message, key)) as VerifySignedMessageDataType;
```
### Get Balance
Returns balance of the current account in wei. You need to convert it to required denomination yourself
```
(await PluralitySocialConnect.getBalance(rpc, chainId)) as GetBalanceDataType;
```

### Send Transaction
Send a certain amount (in ethers) to a certain address. Returns the transaction object. 

Please note that since Plurality profiles are chain agnostic, you need to provide the RPC and the chainId to ensure that balance is being read from the current read. You can find the RPC and the chainId of your preferred chain from [here](https://chainlist.org/)

```
(await PluralitySocialConnect.sendTransaction(rawTx, rpc, chainId)) as SendTransactionDataType;
```

### Get Block Number
Returns the latest block number. Please note that since Plurality profiles are chain agnostic, you need to provide the RPC and the chainId to ensure that balance is being read from the current read. You can find the RPC and the chainId of your preferred chain from [here](https://chainlist.org/)

```
(await PluralitySocialConnect.getBlockNumber(rpc, chainId)) as GetBlockNumberDataType;
```

### Get Transaction Count
Returns the transaction count of the given address
```
(await PluralitySocialConnect.getTransactionCount(address, rpc, chainId)) as GetTransactionCountDataType;
```

### Read from contract
Returns the response of executing the given get method of the contract with the given parameters
```
(await PluralitySocialConnect.readFromContract(address, abiVal, action, params, rpc, chainId)) as ReadFromContractDataType;
```

### Write to contract
Returns the transaction response of executing the given write method of the contract with the given parameters
```
(await PluralitySocialConnect.writeToContract(address, abiVal, action, params, rpc, chainId, options)) as WriteToContractDataType;
```

## Calling profile functions through the Smart Profile Wallet
Each wallet created through this embedded widget has a profile attached to it which contains basic user information like name, bio, avatar and description. Moreover, it also has the user's interests & reputation which is analysed from the social accounts connected to that profile.

As an application developer, you can get profile data from the connected wallet.

Every time the user does a successful login, you will get a response in the data handler that’s attached to the embedded widget

```
const handleDataReturned = (data) => {
    const receivedData = JSON.parse(JSON.stringify(data))
    console.log("dapp receives:", receivedData);
};

<PluralitySocialConnect
    options={options}
    onDataReturned={handleDataReturned}
/>
```

However, if you want to fetch the smart profile data at any point later, you can use the following function.

### Get Smart Profile Data
```
(await PluralitySocialConnect.getSmartProfileData()) as ConnectedAccountDataType;
```

### Set Public Data

As a decentralized application developer, you might also need to store user’s information in a verifiable, decentralized, but gasless and privacy-preserving way. If you want to store any information about the user derived from their actions on your platform, you can set that information in your user’s profile. Next time when the user logs in to this dApp again, then the application will have access to this data again. 

```
(await PluralitySocialConnect.setPublicData("key", "value")) as ConnectedAccountDataType;
```
### Get Public Data
To get previously stored data, the application can get it using the following function

```
(await PluralitySocialConnect.getPublicData("name")) as ConnectedAccountDataType;
```

### Set Private Data

Since user profiles are shared amongst different apps and platforms, if an application wants to ensure that the data you put in your user’s profile cannot be seen by any other application, then the application needs to set it in a private way.  

```
(await PluralitySocialConnect.setPrivateData("work", "Plurality")) as ConnectedAccountDataType;
```

### Get Private Data

To get previously stored data, the application can get it using the following function

```
(await PluralitySocialConnect.getPrivateData("work")) as ConnectedAccountDataType;
```

## To publish new version on npm registry
- Update the version in `package.json` file
- Run `npm run webpack` and verify the `./lib/SocialConnect.js` file if it is updated
- Run `npm version` and verify if the version is updated correctly locally
- Run `npm publish` to publish it to public npm registry

## Customizable attributes
- ```minWidth```: Specify the minimum width of the button
- ```height```: Specify the height of the button
- ```color```: Specify the font color of the button
- ```hoverTextColor```: Specify the font color on hover of the button
- ```fontSize```: Specify the font size of the button
- ```fontFamily```: Specify the font family of the button
- ```backgroundColor```: Specify the background color of the button
- ```hoverBackgroundColor```: Specify the background color on hover of the button
- ```marginTop```: Specify the top margin of the button
- ```borderRadius```: Specify the border radius of the button

## Release
- The package is released on NPM registry via a build pipeline on merge to main

