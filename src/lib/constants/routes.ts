export interface Route {
  path: string
  label: string
}

export const NAVIGATION_ROUTES: Route[] = [
  { path: "/statistics", label: "Statistics" },
  { path: "/overall", label: "Overall" },
]
