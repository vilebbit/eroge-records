import { useSyncExternalStore } from "react"

const subscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function useClient(): boolean {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}
