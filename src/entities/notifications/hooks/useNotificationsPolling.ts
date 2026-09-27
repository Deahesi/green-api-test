import { chatQueries } from "@/entities/chat/queries/chat.queries"
import type { Credentials } from "@/shared/types/credentials"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { notificationsApi } from "../api/notifications"
import type { Message } from "@/entities/chat/model/types"
import { serializeNotification } from "../utils/serializer"

export const useNotificationsPolling = (credentials: Credentials | null) => {
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!credentials) return

		const controller = new AbortController()
		const { signal } = controller

		const startPolling = async () => {
			while (!signal.aborted) {
				try {
					const notification = await notificationsApi.pollNotification(
						credentials,
						signal,
					)

					if (signal.aborted) break
					if (!notification) continue

					const newMessage = serializeNotification(notification)

					if (newMessage?.typeMessage === "textMessage") {
						const chatId = newMessage.chatId
						const state = queryClient.getQueryState(
							chatQueries.chatHistory(credentials, chatId, 100).queryKey,
						)

						if (state?.status === "success")
							queryClient.setQueryData<Message[]>(
								chatQueries.chatHistory(credentials, chatId, 100).queryKey,
								(messages) => {
									if (
										!messages ||
										messages.some(
											(message) => message.idMessage === newMessage.idMessage,
										)
									) {
										return messages
									}

									return [...messages, newMessage].sort(
										(a, b) => a.timestamp - b.timestamp,
									)
								},
							)
						else
							void queryClient.invalidateQueries({
								queryKey: chatQueries.chatHistory(credentials, chatId, 100)
									.queryKey,
							})
						void queryClient.invalidateQueries({
							queryKey: chatQueries.allChats(credentials).queryKey,
						})
					}

					await notificationsApi.deleteNotification(
						credentials,
						notification.receiptId,
					)
				} catch (error) {
					if (signal.aborted) break
					console.error(error)
					await new Promise<void>((resolve) => setTimeout(resolve, 2_000))
				}
			}
		}

		void startPolling()

		return () => {
			controller.abort()
		}
	}, [credentials, queryClient])
}
