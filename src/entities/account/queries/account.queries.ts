import { queryOptions, skipToken } from "@tanstack/react-query"
import { accountApi } from "../api/account"
import type { Credentials } from "@/shared/types/credentials"

export const accountQueries = {
	accountData: (credentials: Credentials | null) =>
		queryOptions({
			queryKey: [
				"account",
				"data",
				credentials?.idInstance,
				credentials?.apiTokenInstance,
				credentials?.apiUrl
			],

			queryFn: credentials
				? async () => {
						return await accountApi.getTelegramAccountInfo(credentials)
					}
				: skipToken,
			staleTime: 10 * 60_000,
			retry: false,
		}),

	contactInfo: (credentials: Credentials | null, chatId?: string | null) =>
		queryOptions({
			queryKey: [
				"account",
				"contact",
				"info",
				credentials?.idInstance,
				credentials?.apiTokenInstance,
				chatId,
			],

			queryFn:
				credentials && chatId
					? async () => {
							return await accountApi.getContactInfo(credentials, chatId)
						}
					: skipToken,
			staleTime: 10 * 60_000,
			gcTime: 30 * 60_000,
		}),
}
