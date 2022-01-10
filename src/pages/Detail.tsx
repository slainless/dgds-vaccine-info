import LocationBackButton from 'Components/pages/Detail/BackButton'
import LocationDetail from 'Components/pages/Detail/TheDetail'
import { useDataContext } from 'Components/DataContext'
import { urlToValue, valueToApi } from 'Functions/regionValueNormalizer'
import useFetchLocations from 'Functions/useFetchLocations'
import { useCityParam, useLocationHashParam } from 'Functions/useValidParams'
import { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import hash from 'object-hash'
import { LocationDetailCache } from '#/cache'
import { useToken } from '@chakra-ui/react'
import useSetRootBg from 'Functions/useSetRootBg'
import useCache from 'Functions/useCache'
import { useStoreContext } from 'Components/StoreContext'
import useSetInitialSearch from './../functions/useSetInitialSearch'

export default function LocationPage() {
  // const { locationStore } = useDataContext()
  // const { getLocation, addLocation } = locationStore
  const city = useCityParam()
  const { pathname } = useLocation()
  const locationHash = useLocationHashParam()
  const {
    locations: [locations],
  } = useStoreContext()

  // pre-defined as backup plan
  const { startFetch, locations: l } = useFetchLocations(
    city ? valueToApi(city) : null,
  )

  // first, will try to get location data from cache.
  const cache = useMemo(() => {
    if (city == null || locationHash == null || locations == null) return null
    console.log('Attempting to use cache with hash:', locationHash)
    // return getLocation({ ...city, hash: locationHash })
    return locations.data.find((l) => hash(l) === locationHash)
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
    if (l == null) return null

    return l.find((l) => hash(l) === locationHash) ?? null
  }, [cache, l])

  useSetRootBg('gray.50')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  useSetInitialSearch()

  useEffect(() => {
    console.log(city)
    if (city == null) return
    if (city === false || (location == null && cache == null))
      window.location.replace('/404.html')
  }, [city, location])

  return (
    <Fragment>
      <LocationBackButton py={3} />
      <LocationDetail data={location} />
    </Fragment>
  )
}
