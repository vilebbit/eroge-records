export interface Route {
  path: string
  label: string
}

export const NAVIGATION_ROUTES: Route[] = [
  { path: "/statistics", label: "Statistics" },
  { path: "/collections", label: "Collections" },
  { path: "/overall", label: "Overall" },
]
