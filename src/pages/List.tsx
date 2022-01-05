import { VStack } from '@chakra-ui/react'
import ListLocationsList from 'Components/pages/List/LocationsList'
import ListSearchBar from 'Components/pages/List/SearchBar'
import useFetchLocations from 'Functions/useFetchLocations'
import { useParams } from 'react-router-dom'
import { useDataContext } from 'Components/DataContext'
import { useEffect, useMemo } from 'react'
import { urlToValue, valueToApi } from 'Functions/regionValueNormalizer'

export default function ListPage() {
  const { province, city } = useParams()
  const { isCityValid, regions } = useDataContext()
  const cityParams = useMemo(() => {
    if (regions == null) return null
    if (province == null || city == null)
      throw new Error('Province & City is empty!')
    const params = valueToApi(urlToValue({ province, city }))

    if (isCityValid(params)) return params
    // TODO: display wrong url feedback instead of returning null
    console.log('URL parameters is invalid!', params)
    return null
  }, [province, city, regions])

  const { locations, startFetch } = useFetchLocations(cityParams)
  useEffect(() => {
    if (cityParams != null) startFetch()
  }, [cityParams])

  return (
    <Fragment>
      <ListSearchBar />
      <ListLocationsList data={locations} />
    </Fragment>
  )
}
