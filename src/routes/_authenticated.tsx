import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated")({
	component: Outlet,
	beforeLoad: (context) => {
		const credentials = context.context.authStore.getState().accountCredentials

		if (!credentials) {
			throw redirect({ to: "/" })
		}
	},
})
