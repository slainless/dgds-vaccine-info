import { VStack } from '@chakra-ui/react'
import ListLocationsList from 'Components/pages/List/LocationsList'
import ListSearchBar from 'Components/pages/List/SearchBar'
import useFetchLocations from 'Functions/useFetchLocations'
import { useLocation, useParams } from 'react-router-dom'
import { useDataContext } from 'Components/DataContext'
import { useEffect, useMemo } from 'react'
import { urlToValue, valueToApi } from 'Functions/regionValueNormalizer'
import { useCityParam } from 'Functions/useValidParams'
import hash from 'object-hash'
import type { Locations } from 'types/api'
import useSetRootBg from 'Functions/useSetRootBg'
import { LocationListCache } from '#/cache'
import useCache from 'Functions/useCache'
import useScrollTracker from 'Functions/useScrollTracker'
import { useStoreContext } from 'Components/StoreContext'

export default function ListPage() {
  const { regions } = useDataContext()
  const city = useCityParam()
  const { lastLocation, setLastLocation } = useCache()

  const { locations: l, startFetch } = useFetchLocations(
    city ? valueToApi(city) : null,
  )
  const location = useLocation()

  // only fetch when city is not null and last param !== current param
  //
  // BACKGROUND:
  // this is to prevent unneccessary fetching of locations.
  // because every back nav from detail page to this page will
  // clear `locations` value, which means we have to fetch locations every
  // time we back navigate from detail page to list page.
  //
  // SOLUTION:
  // To prevent this, we store last param, which is used
  // to compare against current param. fetching will only be fired when
  // last param !== current param.
  useEffect(() => {
    const lastHash = lastLocation?.pathname
    if (city == null) return
    if (lastHash != null && hash(location.pathname) === hash(lastHash)) return
    startFetch()
  }, [city])

  // will take advantage of `locations` initial value which is null
  // if null, then return cached value, else using newly fetched data
  // will use `locations` as trigger, meaning:
  // - only triggered on initial value: null
  // - when `startFetch` above is fired
  //   - which is only fired when last param !== current param
  const locations = useMemo(() => {
    if (l == null) return lastLocation?.locations ?? null
    return l
  }, [l])

  useEffect(() => {
    if (l == null) return
    setLastLocation({
      pathname: location.pathname,
      locations: l,
    })
  }, [l])

  useSetRootBg('gray.50')
  const { restoreScroll } = useScrollTracker(location.pathname, true)
  useEffect(() => {
    restoreScroll(true)
  }, [location, l, locations])

  return (
    <Fragment>
      <ListSearchBar />
      <ListLocationsList data={locations} />
    </Fragment>
  )
}
