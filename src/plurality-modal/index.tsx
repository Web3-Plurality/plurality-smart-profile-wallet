import {
    AllAccounts,
    AllAccountsDataType,
    ConnectedAccountDataType,
    GetBalanceDataType,
    GetBlockNumberDataType,
    GetTransactionCountDataType,
    GlobalDataResponse,
    Provider,
    ReadFromContractDataType,
    SendTransactionDataType,
    SignMessageDataType,
    SwitchNetworkDataType,
    VerifySignedMessageDataType,
    WriteToContractDataType
} from './types/returnTypes';

import { PluralitySocialConnect } from './PluralitySocialConnect';


export { PluralitySocialConnect } 

export type {
    GlobalDataResponse,
    AllAccounts,
    Provider,
    AllAccountsDataType,
    ConnectedAccountDataType,
    SignMessageDataType,
    VerifySignedMessageDataType,
    GetBalanceDataType,
    SendTransactionDataType,
    GetBlockNumberDataType,
    GetTransactionCountDataType,
    ReadFromContractDataType,
    WriteToContractDataType,
    SwitchNetworkDataType
};

export default PluralitySocialConnect; 