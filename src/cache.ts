import type { City, Locations, Region } from 'types/api'
import type { Location } from 'history'

const LocationDetailCache: Record<string, Locations> = {}
const LocationListCache: {
  lastHash: string | null
  locations: Locations[] | null
  lastLocation: Location | null
} = {
  lastHash: null,
  locations: null,
  lastLocation: null,
}

export { LocationDetailCache, LocationListCache }
