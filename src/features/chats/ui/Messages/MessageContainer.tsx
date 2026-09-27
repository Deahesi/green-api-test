import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageHeader,
} from "@/components/ui/message"
import { MessageScrollerItem } from "@/components/ui/message-scroller"
import type { Message as MessageType } from "@/entities/chat/model/types"
import type { PropsWithChildren } from "react"
import { cn } from "cn"

export type MessageContainerProps = {
	message: MessageType
	chatName?: string
	selfName?: string
}

export const MessageContainer = ({
	message,
	chatName,
	selfName,
	children,
}: PropsWithChildren<MessageContainerProps>) => {
	const name =
		message.type === "incoming"
			? (message.senderName ?? message.senderContactName ?? chatName)
			: selfName
	return (
		<MessageScrollerItem
			key={message.idMessage}
			messageId={message.idMessage}
			className="w-full max-w-full"
		>
			<Message
				align={message.type === "incoming" ? "start" : "end"}
				className="max-w-[85%]"
			>
				<MessageAvatar>
					<Avatar>
						<AvatarFallback str={name}>{name?.at(0) || "Н"}</AvatarFallback>
					</Avatar>
				</MessageAvatar>
				<div
					className={cn(
						"flex flex-col gap-1",
						message.type === "incoming" ? "items-start" : "items-end",
					)}
				>
					<MessageHeader className="font-semibold">{name}</MessageHeader>
					<MessageContent>{children}</MessageContent>
				</div>
			</Message>
		</MessageScrollerItem>
	)
}
