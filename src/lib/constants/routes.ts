export interface Route {
  path: string
  label: string
}

export const NAVIGATION_ROUTES: Route[] = [
  { path: "/", label: "Home" },
  { path: "/statistics", label: "Statistics" },
  { path: "/overall", label: "Overall" },
]
