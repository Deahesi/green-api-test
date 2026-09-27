
export type ChatType = 'user' | 'group' | 'supergroup' | 'channel'

export type Chat = {
    chatId: string
    name: string
    type: ChatType
    phoneNumber: number
    username: string
}