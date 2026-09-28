import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { accountQueries } from "@/entities/account/queries/account.queries"
import { getAccountSettingsBodySchema } from "@/entities/account/schemas/account.schema"
import { useAuthStore } from "@/features/auth/store/auth"
import type { Credentials } from "@/shared/types/credentials"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form"

export const Route = createFileRoute("/")({
	component: LoginPage,
})

function LoginPage() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const setAccountCredentials = useAuthStore(
		(state) => state.setAccountCredentials,
	)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Credentials>({
		resolver: zodResolver(getAccountSettingsBodySchema),
		defaultValues: {
			apiTokenInstance: "",
			idInstance: "",
		},
	})

	const getAccountMutation = useMutation({
		mutationFn: async (payload: Credentials) => {
			const data = await queryClient.query(accountQueries.accountData(payload))
			await queryClient.query(accountQueries.contactInfo(payload, data.chatId))
			return payload
		},
		onSuccess: (credentials) => {
			setAccountCredentials(credentials)
			navigate({
				to: "/chats",
			})
		},
	})

	return (
		<div className="bg-background-panel p-10 w-max m-auto rounded-lg flex flex-col gap-5">
			<h1 className="text-center">Войдите в Инстанс</h1>
			<form
				onSubmit={handleSubmit((data) => getAccountMutation.mutate(data))}
				className="flex flex-col gap-3"
			>
				<Input
					{...register("apiTokenInstance")}
					label="API токен"
					placeholder="3431..."
					aria-invalid={!!errors.apiTokenInstance}
					description={errors.apiTokenInstance?.message}
				/>
				<Input
					{...register("idInstance")}
					label="Instance ID"
					placeholder="5367..."
					aria-invalid={!!errors.idInstance}
					description={errors.idInstance?.message}
				/>
				<Button
					loading={getAccountMutation.isPending}
					disabled={getAccountMutation.isPending}
					type="submit"
				>
					Войти
				</Button>
				{getAccountMutation.isError && (
					<p role="alert">Не удалось получить данные аккаунта.</p>
				)}
			</form>
		</div>
	)
}
