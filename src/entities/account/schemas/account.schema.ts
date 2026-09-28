import z from "zod";

export const getAccountSettingsBodySchema = z.object({
	idInstance: z
		.string()
		.trim()
		.min(1, "Введите ID инстанса"),
	apiTokenInstance: z
		.string()
		.trim()
		.min(1, "Введите API токен"),
})
