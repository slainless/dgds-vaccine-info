import type { City, Locations, Region } from 'types/api'

const LocationCache: Record<string, Locations> = {}
const SessionCache: {
  regions: Region[]
  lastSelectedCity: City | undefined
  scrollY: number
} = {
  regions: [],
  lastSelectedCity: undefined,
  scrollY: 0,
}

export { LocationCache, SessionCache }
