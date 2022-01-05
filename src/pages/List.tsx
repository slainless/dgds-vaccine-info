import { VStack } from '@chakra-ui/react'
import ListLocationsList from 'Components/pages/List/LocationsList'
import ListSearchBar from 'Components/pages/List/SearchBar'
import useFetchLocations from 'Functions/useFetchLocations'
import { useParams } from 'react-router-dom'
import { useDataContext } from 'Components/DataContext'
import { useEffect, useMemo } from 'react'
import { urlToValue, valueToApi } from 'Functions/regionValueNormalizer'
import { useCityParam } from 'Functions/useValidParams'
import hash from 'object-hash'
import type { Locations } from 'types/api'

const locationsCache: {
  lastHash: string | null
  locations: Locations[] | null
} = {
  lastHash: null,
  locations: null,
}
export default function ListPage() {
  const { regions } = useDataContext()
  const city = useCityParam()

  const { locations: l, startFetch } = useFetchLocations(
    city ? valueToApi(city) : null,
  )

  useEffect(() => {
    const lastHash = locationsCache.lastHash
    if (city == null) return
    if (lastHash != null && hash(city) === lastHash) return
    startFetch()
  }, [city])

  const locations = useMemo(() => {
    if (l == null) return locationsCache.locations
    locationsCache.lastHash = hash(city)
    locationsCache.locations = l

    return l
  }, [l])

  return (
    <Fragment>
      <ListSearchBar />
      <ListLocationsList data={locations} />
    </Fragment>
  )
}
