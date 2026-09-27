import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Chat } from "@/entities/chat/model/types"
import { cn } from "cn"

type ChatItemProps = {
	chat: Chat
	isActive: boolean
	onOpen: (chatId: string) => void
}

export const ChatItem = ({ chat, onOpen, isActive }: ChatItemProps) => {
	const name = chat.name ?? chat.username

	return (
		<div
			onClick={() => onOpen(chat.chatId)}
			className={cn(
				"cursor-pointer p-3 rounded-lg transition-colors flex items-center gap-5 hover:bg-primary-500",
				isActive && "bg-primary-500",
			)}
		>
			<Avatar size="lg">
				<AvatarFallback str={name}>{name.at(0) || "Н"}</AvatarFallback>
			</Avatar>
			<p>{name}</p>
		</div>
	)
}
