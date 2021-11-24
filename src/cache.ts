import type { Cities, Locations, Regions } from 'types/api'

const LocationCache: Record<string, Locations> = {}
const SessionCache: {
  regions: Regions[]
  lastSelectedCity: Cities | undefined
} = {
  regions: [],
  lastSelectedCity: undefined,
}

export { LocationCache, SessionCache }
