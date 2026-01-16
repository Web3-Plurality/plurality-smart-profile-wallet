export interface BasePayload {
    id: string;
    type: string;
    method: string;
    isWidgetOpen: string
}

export interface MessagePayload extends BasePayload {
    message: string;
}

export interface DataPayload extends BasePayload {
    key: string;
    value: string;
}

export interface MessageSignaturePayload extends MessagePayload {
    signature: string;
}

export type Payload = BasePayload | MessagePayload | MessageSignaturePayload;

interface Scores {
    scoreType: string
    scoreValue: number
}
export interface User {
    username?: string;
    user?: string;
    name?: string;
    avatar?: string;
    profileIcon?: string;
    ratings?: number;
    rating?: number;
    scores: Scores[]
    consent: boolean
    showRoulette: boolean
}

export interface StepperData extends BasePayload {
    step: string;
}
