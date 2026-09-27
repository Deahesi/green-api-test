// ReceiveNotification can return different event bodies. Validate the body
// before treating it as a message.
export type Notification = {
	receiptId: number
	body: unknown
}
