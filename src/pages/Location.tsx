import LocationBackButton from 'Components/pages/Location/BackButton'
import LocationDetail from 'Components/pages/Location/Detail'
import { useDataContext } from 'Components/DataContext'
import { urlToValue, valueToApi } from 'Functions/regionValueNormalizer'
import useFetchLocations from 'Functions/useFetchLocations'
import { useCityParam, useLocationHashParam } from 'Functions/useValidParams'
import { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import hash from 'object-hash'
import { LocationDetailCache } from '#/cache'

export default function LocationPage() {
  // const { locationStore } = useDataContext()
  // const { getLocation, addLocation } = locationStore
  const city = useCityParam()
  const locationHash = useLocationHashParam()

  // pre-defined as backup plan
  const { startFetch, locations } = useFetchLocations(
    city ? valueToApi(city) : null,
  )

  // first, will try to get location data from cache.
  const cache = useMemo(() => {
    if (city == null || locationHash == null) return null
    console.log('Attempting to use cache with hash:', locationHash)
    // return getLocation({ ...city, hash: locationHash })
    return LocationDetailCache[locationHash] ?? null
  }, [city, locationHash])

  // if city parameters is empty, then skip
  // if cache is null (ie. no cache found), then
  // will fire locations fetching instead
  useEffect(() => {
    if (city == null) return
    if (cache == null) {
      console.log('Fetching since cache is empty!')
      startFetch()
    }
  }, [city, cache])

  // location will return cache if it's not empty
  // instead, will determine location from fetched locations
  // by comparing it's hash with locationHash params
  // if no location found, then return null instead
  const location = useMemo(() => {
    if (cache) return cache
    if (locations == null) return null

    return locations.find((l) => hash(l) === locationHash) ?? null
  }, [cache, locations])

  // will cache location if it's not already been cached
  useEffect(() => {
    // console.log(cache, location)
    if (cache == null && location != null) {
      console.log('Caching newly fetched location')
      // addLocation({ ...city!, location })
      LocationDetailCache[hash(location)] = location
    }
  }, [location])
  return (
    <Fragment>
      <LocationBackButton />
      <LocationDetail data={location} />
    </Fragment>
  )
}
