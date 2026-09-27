import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import type { Message as MessageType } from "@/entities/chat/model/types"
import { MessageProvider } from "../Messages/MessageProvider"

type ChatMessagesProps = {
	messages: MessageType[]
	chatName?: string
	selfName?: string
}

export const ChatMessages = ({
	messages,
	chatName,
	selfName,
}: ChatMessagesProps) => {
	return (
		<MessageScrollerProvider autoScroll defaultScrollPosition="end">
			<MessageScroller className="min-h-0 flex-1">
				<MessageScrollerViewport className="min-h-0 flex-1">
					<MessageScrollerContent className="p-3">
						{messages.map((message) => (
							<MessageScrollerItem>
								<MessageProvider
									key={message.idMessage}
									message={message}
									chatName={chatName}
									selfName={selfName}
								/>
							</MessageScrollerItem>
						))}
					</MessageScrollerContent>
				</MessageScrollerViewport>

				<MessageScrollerButton />
			</MessageScroller>
		</MessageScrollerProvider>
	)
}
