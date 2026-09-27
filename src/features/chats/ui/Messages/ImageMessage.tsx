import type { Message as MessageType } from "@/entities/chat/model/types"

export type TextMessageProps = {
	message: MessageType
}

export const ImageMessage = ({ message }: TextMessageProps) => {
	return message.typeMessage === "imageMessage" ? (
		<img src={message.downloadUrl} />
	) : (
		<></>
	)
}
