import { useEffect } from "react"

export const useResetTimeoutValue = (value: unknown, callback: Function, timeoutMs: number) => {
	
		useEffect(() => {
			if (!value) return
	
			const timeout = window.setTimeout(() => {
				callback()
			}, timeoutMs)
	
			return () => window.clearTimeout(timeout)
		}, [value, callback])
}