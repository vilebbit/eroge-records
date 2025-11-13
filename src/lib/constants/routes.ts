export interface Route {
  path: string
  label: string
}

export const NAVIGATION_ROUTES: Route[] = [
  { path: "/overall", label: "Overall" },
  { path: "/statistics", label: "Statistics" },
  { path: "/collections", label: "Collections" },
  { path: "/about", label: "About" },
]
