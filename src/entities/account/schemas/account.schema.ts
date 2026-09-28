import z from "zod";

export const getAccountSettingsBodySchema = z.object({
	apiUrl: z
		.string()
		.trim()
		.min(1, "Введите API url"),
	idInstance: z
		.string()
		.trim()
		.min(1, "Введите ID инстанса"),
	apiTokenInstance: z
		.string()
		.trim()
		.min(1, "Введите API токен"),
})
