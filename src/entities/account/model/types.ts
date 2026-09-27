import type { StateInstance } from '@/entities/instance/@x/account';

export type AccountData = {
    avatar: string
    phone: string
    stateInstance: StateInstance
    chatId: string
    suspendedUntil: number
    username: string
    historySyncProcess: number
}




export type CheckAccount = {
    exist: boolean
    chatId: string
    username: string
    phoneNumber: number
    fromCache: boolean
}

