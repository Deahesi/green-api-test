import type { Credentials } from "@/shared/types/credentials"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type AuthStore = {
	accountCredentials: Credentials | null
	setAccountCredentials: (account: Credentials) => void
	resetAccountCredentials: () => void
}

export const useAuthStore = create<AuthStore>()(
	immer((set) => ({
		accountCredentials: null,
		setAccountCredentials: (payload: Credentials) => {
			set((state) => {
				state.accountCredentials = payload
			})
		},
		resetAccountCredentials: () => {
			set((state) => {
				state.accountCredentials = null
			})
		},
	})),
)
