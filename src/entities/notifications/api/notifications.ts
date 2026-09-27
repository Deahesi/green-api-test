import { apiClient } from "@/shared/api/client"
import type { Credentials } from "@/shared/types/credentials"
import type { Notification } from "../model/types"
import type { DeleteNotificationResponse } from "../model/api"

const configuredTimeout = Number(import.meta.env.VITE_NOTIFICATION_TIMEOUT)
const receiveTimeout =
	Number.isInteger(configuredTimeout) &&
	configuredTimeout >= 5 &&
	configuredTimeout <= 60
		? configuredTimeout
		: 5

export const notificationsApi = {
	pollNotification: async (
		{ idInstance, apiTokenInstance }: Credentials,
		signal: AbortSignal,
	): Promise<Notification | null> => {
		const response = await apiClient.get<Notification | null>(
			`/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
			{
				params: { receiveTimeout },
				timeout: (receiveTimeout + 10) * 1000,
				signal,
			},
		)
		return response.data
	},

	deleteNotification: async (
		{ idInstance, apiTokenInstance }: Credentials,
		receiptId: number,
	): Promise<DeleteNotificationResponse | null> => {
		const response = await apiClient.delete<DeleteNotificationResponse>(
			`/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
		)
		return response.data
	},
}
