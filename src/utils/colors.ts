import { djb2 } from "./hash"

export function textToHashColor(str: string) {
	const hash = djb2(str)

	const r = (hash & 0xff0000) >> 16
	const g = (hash & 0x00ff00) >> 8
	const b = hash & 0x0000ff

	const toHex = (num: number) => ("0" + num.toString(16)).slice(-2)

	return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
