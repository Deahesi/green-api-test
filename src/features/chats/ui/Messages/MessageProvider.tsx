import type { Message as MessageType } from "@/entities/chat/model/types"
import { TextMessage } from "./TextMessage"
import { ImageMessage } from "./ImageMessage"
import { MessageContainer } from "./MessageContainer"
import { NotProvidedMessage } from "./NotProvidedMessage"

type MessageProviderProps = {
	message: MessageType
	chatName?: string
	selfName?: string
}

export const MessageProvider = ({
	message,
	chatName,
	selfName,
}: MessageProviderProps) => {
	const getMessageContent = () => {
		switch (message.typeMessage) {
			case "textMessage":
				return <TextMessage message={message} />
			case "imageMessage":
				return <ImageMessage message={message} />
			default:
				return <NotProvidedMessage />
		}
	}
	return (
		<MessageContainer message={message} chatName={chatName} selfName={selfName}>
			{getMessageContent()}
		</MessageContainer>
	)
}
