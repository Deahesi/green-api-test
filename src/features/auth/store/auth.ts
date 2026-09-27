import { create } from 'zustand'

export type AuthCredentials = {
  idInstance: string
  apiTokenInstance: string
}

type AuthStore = AuthCredentials & {
  setCredentials: (credentials: AuthCredentials) => void
  clearCredentials: () => void
}

const initialCredentials: AuthCredentials = {
  idInstance: '',
  apiTokenInstance: '',
}

export const useAuthStore = create<AuthStore>()((set) => ({
  ...initialCredentials,
  setCredentials: (credentials) => set(credentials),
  clearCredentials: () => set(initialCredentials),
}))
