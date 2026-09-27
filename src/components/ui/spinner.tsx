import { cn } from "cn"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading02Icon } from "@hugeicons/core-free-icons"

function Spinner({
	className,
	...props
}: Omit<React.ComponentProps<typeof HugeiconsIcon>, "icon">) {
	return (
		<HugeiconsIcon
			icon={Loading02Icon}
			strokeWidth={2}
			data-slot="spinner"
			role="status"
			aria-label="Loading"
			className={cn("size-4 animate-spin text-primary-500", className)}
			{...props}
		/>
	)
}

function FullSpinner({
	...props
}: Omit<React.ComponentProps<typeof HugeiconsIcon>, "icon">) {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Spinner {...props} />
		</div>
	)
}

export { Spinner, FullSpinner }
