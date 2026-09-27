import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { accountApi } from "@/entities/account/api/account"
import type { CheckAccountBody } from "@/entities/account/model/api"
import { accountQueries } from "@/entities/account/queries/account.queries"
import type { Chat as ChatType } from "@/entities/chat/model/types"
import { chatQueries } from "@/entities/chat/queries/chat.queries"
import { checkAccountBodySchema } from "@/entities/chat/schemas/chat.schema"
import { useNotificationsPolling } from "@/entities/notifications/hooks/useNotificationsPolling"
import { useAuthStore } from "@/features/auth/store/auth"
import { Chat } from "@/features/chats/ui/Chat/Chat"
import { ChatsBar } from "@/features/chats/ui/ChatsBar/ChatsBar"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useResetTimeoutValue } from "@/shared/hooks/useResetTimeoutValue"

export const Route = createFileRoute("/_authenticated/chats")({
	component: RouteComponent,
})

function RouteComponent() {
	const credentials = useAuthStore((state) => state.accountCredentials)
	const chats = useQuery(chatQueries.allChats(credentials))
	useNotificationsPolling(credentials)

	const [openedChatId, setOpenedChatId] = useState<string | null>(null)

	const createChatMutation = useMutation({
		mutationFn: async (payload: CheckAccountBody) => {
			if (!credentials) throw Error("Авторизация недействительна")
			const response = await accountApi.checkAccount(credentials, payload)
			if (!response.exist) throw Error("Аккаунта не существует")

			return response
		},
		onSuccess: async (response, _v, _c, context) => {
			const contact = await context.client.query(
				accountQueries.contactInfo(credentials, response.chatId),
			)
			const newChat: ChatType = {
				chatId: contact.chatId,
				name: contact.name,
				type: contact.chatType,
				phoneNumber: contact.phoneNumber,
				username: contact.username,
			}
			context.client.setQueryData(
				chatQueries.allChats(credentials).queryKey,
				(old) => [
					newChat,
					...(old?.filter((chat) => chat.chatId !== newChat.chatId) || []),
				],
			)
			setOpenedChatId(contact.chatId)
		},
	})

	const { handleSubmit, register, formState, clearErrors } = useForm<
		z.input<typeof checkAccountBodySchema>,
		unknown,
		z.output<typeof checkAccountBodySchema>
	>({
		resolver: zodResolver(checkAccountBodySchema),
		defaultValues: {
			phoneNumber: "",
			force: false,
		},
	})

	useResetTimeoutValue(formState.errors.phoneNumber, clearErrors, 5000)
	useResetTimeoutValue(
		createChatMutation.isError,
		createChatMutation.reset,
		5000,
	)

	const handleChatOpen = (chatId: string) => {
		setOpenedChatId(chatId)
	}

	const isCreateChatError =
		formState.errors.phoneNumber || createChatMutation.isError
	const createChatErrorMessage =
		formState.errors.phoneNumber?.message || createChatMutation.error?.message

	return (
		<div className="flex h-full min-h-0 min-w-0 flex-col gap-3 overflow-hidden md:flex-row">
			<div className="flex flex-col gap-2">
				<div className="flex items-start gap-1">
					<Input
						aria-invalid={isCreateChatError ? "true" : "false"}
						{...register("phoneNumber")}
						placeholder="Введите номер..."
						description={createChatErrorMessage}
					/>
					<Button
						onClick={handleSubmit((payload) =>
							createChatMutation.mutate(payload),
						)}
						className="h-12"
					>
						Написать
					</Button>
				</div>

				<ChatsBar
					openChatId={openedChatId}
					onChatOpen={handleChatOpen}
					chats={chats.data ?? []}
				/>
			</div>
			{openedChatId && <Chat key={openedChatId} chatId={openedChatId} />}
		</div>
	)
}
