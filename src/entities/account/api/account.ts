import { apiClient } from "@/shared/api/client"
import type { AccountData, ContactData } from "../model/types"
import type { Credentials } from "@/shared/types/credentials"
import type { CheckAccountBody, CheckAccountResponse } from "../model/api"

export const accountApi = {
	getTelegramAccountInfo: async ({
		idInstance,
		apiTokenInstance,
	}: Credentials): Promise<AccountData> => {
		const response = await apiClient.get<AccountData>(
			`/waInstance${idInstance}/getAccountSettings/${apiTokenInstance}`,
		)
		return response.data
	},
	checkAccount: async (
		{ idInstance, apiTokenInstance }: Credentials,
		payload: CheckAccountBody,
	): Promise<CheckAccountResponse> => {
		const response = await apiClient.post<CheckAccountResponse>(
			`/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
			payload,
		)
		return response.data
	},
	getContactInfo: async (
		{ idInstance, apiTokenInstance }: Credentials,
		chatId: string,
	): Promise<ContactData> => {
		const response = await apiClient.post<ContactData>(
			`/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
			{
				chatId,
			},
		)
		return response.data
	},
}
