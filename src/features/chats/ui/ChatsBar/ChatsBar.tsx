import type { Chat } from "@/entities/chat/model/types"
import { ChatItem } from "../ChatItem/ChatItem"
import { ScrollArea } from "@/components/ui/scroll-area"

type ChatsBarProps = {
	chats: Chat[]
	onChatOpen: (chatId: string) => void
	openChatId?: string | null
}

export const ChatsBar = ({ chats, onChatOpen, openChatId }: ChatsBarProps) => {
	return (
		<ScrollArea className="md:h-full md:w-130 min-h-0 min-w-0 w-full rounded-lg">
			<div className="flex flex-col gap-1 overflow-y-auto rounded-lg bg-background-panel p-4">
				{chats.map((chat) => (
					<ChatItem
						key={chat.chatId}
						isActive={chat.chatId === openChatId}
						onOpen={onChatOpen}
						chat={chat}
					/>
				))}
			</div>
		</ScrollArea>
	)
}
