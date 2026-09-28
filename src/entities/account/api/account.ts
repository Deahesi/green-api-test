import { apiClient } from "@/shared/api/client"
import type { AccountData, ContactData } from "../model/types"
import type { Credentials } from "@/shared/types/credentials"
import type { CheckAccountBody, CheckAccountResponse } from "../model/api"

export const accountApi = {
	getTelegramAccountInfo: async ({
		idInstance,
		apiTokenInstance,
		apiUrl,
	}: Credentials): Promise<AccountData> => {
		const response = await apiClient.get<AccountData>(
			`${apiUrl}/waInstance${idInstance}/getAccountSettings/${apiTokenInstance}`,
		)
		return response.data
	},
	checkAccount: async (
		{ idInstance, apiTokenInstance, apiUrl }: Credentials,
		payload: CheckAccountBody,
	): Promise<CheckAccountResponse> => {
		const response = await apiClient.post<CheckAccountResponse>(
			`${apiUrl}/waInstance${idInstance}/checkAccount/${apiTokenInstance}`,
			payload,
		)
		return response.data
	},
	getContactInfo: async (
		{ idInstance, apiTokenInstance, apiUrl }: Credentials,
		chatId: string,
	): Promise<ContactData> => {
		const response = await apiClient.post<ContactData>(
			`${apiUrl}/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
			{
				chatId,
			},
		)
		return response.data
	},
}
