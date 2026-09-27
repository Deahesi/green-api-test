import { useAuthStore } from "@/features/auth/store/auth"
import type { QueryClient } from "@tanstack/react-query"

export type RouterContext = {
	queryClient: QueryClient
	authStore: typeof useAuthStore
}
