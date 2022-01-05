import type { City, Locations, Region } from 'types/api'

const LocationDetailCache: Record<string, Locations> = {}
const LocationListCache = new Map<
  { city: string; province: string },
  Locations[]
>()

export { LocationDetailCache, LocationListCache }
