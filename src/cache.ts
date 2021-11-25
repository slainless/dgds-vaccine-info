import type { Cities, Locations, Regions } from 'types/api'

const LocationCache: Record<string, Locations> = {}
const SessionCache: {
  regions: Regions[]
  lastSelectedCity: Cities | undefined
  scrollY: number
} = {
  regions: [],
  lastSelectedCity: undefined,
  scrollY: 0,
}

export { LocationCache, SessionCache }
