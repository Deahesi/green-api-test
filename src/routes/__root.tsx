import * as React from "react"
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router"
import type { RouterContext } from "../app/router-context"

export const Route = createRootRouteWithContext<RouterContext>()({
	component: Root,
})

function Root() {
	return (
		<React.Fragment>
			<div className="bg-primaryBg h-dvh overflow-hidden p-3">
				<Outlet />
			</div>
		</React.Fragment>
	)
}
