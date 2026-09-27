import type { Message as MessageType } from "@/entities/chat/model/types"

export type TextMessageProps = {
	message: MessageType
}

export const TextMessage = ({ message }: TextMessageProps) => {
	return message.typeMessage === "textMessage" ? (
		<p className="min-w-0 whitespace-pre-wrap wrap-anywhere">
			{message.textMessage}
		</p>
	) : (
		<></>
	)
}
