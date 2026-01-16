export { PluralitySocialConnect } from '../PluralitySocialConnect';


export interface GlobalDataResponse {
    id: string
    eventName: string
}

export interface SignMessageDataType extends GlobalDataResponse {
    data: string
}

export interface VerifySignedMessageDataType extends GlobalDataResponse {
    data: string
}

export interface PrivateAppData extends GlobalDataResponse {
    data: string
}
