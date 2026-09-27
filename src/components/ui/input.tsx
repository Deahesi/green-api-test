import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"
import { Field, FieldDescription, FieldLabel } from "./field"

type InputProps = React.ComponentProps<"input"> & {
	label?: string
	description?: string
	error?: boolean | null
}

function Input({
	className,
	label,
	description,
	type,
	"aria-invalid": ariaInvalid,
	...props
}: InputProps) {
	return (
		<Field>
			{!!label && <FieldLabel>{label}</FieldLabel>}
			<InputPrimitive
				type={type}
				data-slot="input"
				aria-invalid={ariaInvalid}
				className={cn(
					`h-12 w-full min-w-0 rounded-lg border border-input/15 
          bg-input/10 px-3 py-1 text-base transition-colors outline-none 
          file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm 
          file:font-medium file:text-foreground placeholder:text-muted-foreground 
          focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50 
          disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 
          aria-invalid:border-destructive aria-invalid:ring-[1px] aria-invalid:ring-destructive/20 
          md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`,
					// error && "border-red",
					className,
				)}
				{...props}
			/>
			{description && (
				<FieldDescription
					aria-invalid={ariaInvalid}
					className="aria-invalid:text-destructive dark:aria-invalid:text-destructive/50"
				>
					{description}
				</FieldDescription>
			)}
		</Field>
	)
}

export { Input }
