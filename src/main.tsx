import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource-variable/noto-sans/wght.css"
import "@fontsource-variable/noto-sans/wght-italic.css"
import "./index.css"
import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router.tsx"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./app/query-client.ts"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
)
