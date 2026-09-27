import { chatQueries } from "@/entities/chat/queries/chat.queries"
import { accountQueries } from "@/entities/account/queries/account.queries"
import { sendMessageBodySchema } from "@/entities/chat/schemas/chat.schema"
import { useAuthStore } from "@/features/auth/store/auth"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ChatMessages } from "./ChatMessages"
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group"
import { chatApi } from "@/entities/chat/api/chat"
import type { SendMessageBody } from "@/entities/chat/model/api"
import { FieldError } from "@/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useChatFromList } from "../../hooks/useChatFromList"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FullSpinner } from "@/components/ui/spinner"
import { useResetTimeoutValue } from "@/shared/hooks/useResetTimeoutValue"

type ChatProps = {
	chatId: string
}

export const Chat = ({ chatId }: ChatProps) => {
	const credentials = useAuthStore((state) => state.accountCredentials)
	//   const queryClient = useQueryClient();
	const messages = useQuery(chatQueries.chatHistory(credentials, chatId, 100))
	const chat = useChatFromList(chatId)
	const account = useQuery(accountQueries.accountData(credentials))
	const selfContact = useQuery(
		accountQueries.contactInfo(credentials, account.data?.chatId),
	)

	const {
		register,
		handleSubmit,
		resetField,
		clearErrors,
		formState: { errors },
	} = useForm<SendMessageBody>({
		resolver: zodResolver(sendMessageBodySchema),
		defaultValues: { chatId, message: "" },
	})

	const sendMessageMutation = useMutation({
		mutationFn: async (message: SendMessageBody) => {
			if (!credentials) throw new Error("Нет данных для отправки сообщения")

			return chatApi.sendMessage(credentials, message)
		},
		onSuccess: async () => {
			resetField("message")
			//   await queryClient.invalidateQueries({
			//     queryKey: chatQueries.chat(credentials, chatId, 100).queryKey,
			//   });
		},
	})

	useResetTimeoutValue(errors.message, clearErrors, 250)

	const name =
		messages.data?.find((m) => m.type === "incoming")?.senderName ??
		chat.data?.name ??
		chat.data?.username
	const selfName =
		selfContact.data?.name ?? account.data?.username ?? account.data?.phone

	return (
		<div className="flex min-h-0 min-w-0 w-[70%] m-auto my-0 flex-col overflow-hidden rounded-lg bg-background-panel pb-4">
			<div className="p-4 flex justify-end items-center bg-background-panel-light gap-3">
				<p className="text-lg font-semibold">{name}</p>
				<Avatar>
					<AvatarFallback str={name}>{name?.at(0) || "Н"}</AvatarFallback>
				</Avatar>
			</div>

			{!messages.isPending ? (
				<ChatMessages
					messages={messages.data || []}
					chatName={name}
					selfName={selfName}
				/>
			) : (
				<FullSpinner className="size-12" />
			)}

			<form
				className="flex min-w-0 flex-col gap-1 px-4"
				onSubmit={handleSubmit((data) => sendMessageMutation.mutate(data))}
			>
				<input type="hidden" {...register("chatId")} />
				<InputGroup>
					<InputGroupInput
						{...register("message")}
						aria-label="Сообщение"
						aria-invalid={!!errors.message}
						aria-describedby={errors.message ? "message-error" : undefined}
						placeholder="Введите сообщение..."
						maxLength={4096}
						disabled={sendMessageMutation.isPending}
					/>
					<InputGroupAddon align="inline-end">
						<InputGroupButton
							type="submit"
							variant="default"
							size="variable"
							disabled={sendMessageMutation.isPending || !credentials}
						>
							Отправить
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
				{sendMessageMutation.isError && (
					<FieldError>
						Не удалось отправить сообщение. Попробуйте ещё раз.
					</FieldError>
				)}
			</form>
		</div>
	)
}
