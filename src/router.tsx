import { queryClient } from "./app/query-client.ts"
import { useAuthStore } from "./features/auth/store/auth.ts"
import { routeTree } from "./routeTree.gen.ts"
import { createRouter } from "@tanstack/react-router"

export const router = createRouter({
	routeTree,
	context: {
		queryClient,
		authStore: useAuthStore,
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}
