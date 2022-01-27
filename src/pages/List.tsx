import { VStack } from '@chakra-ui/react'
import TheList from 'Components/pages/List/TheList'
import ListSearchBar from 'Components/pages/List/SearchBar'
import useFetchLocations from 'Functions/useFetchLocations'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useCityParam } from 'Functions/useValidParams'
import hash from 'object-hash'
import type { VidDetail } from 'types/data'
import useSetRootBg from 'Functions/useSetRootBg'
import useCache from 'Functions/useCache'
import { useStoreContext } from 'Components/StoreContext'
import useSetInitialSearch from 'Functions/useSetInitialSearch'

export default function ListPage() {
  // const { regions } = useDataContext()
  const {
    locations: [locationsStore, setLocationsStore],
    regions: [regions],
  } = useStoreContext()
  const { pathname } = useLocation()
  const city = useCityParam()

  const { locations: l, startFetch } = useFetchLocations(city ? city : null)

  // only fetch when locationsStore is null or
  // locationsStore.pathname is not current pathname
  //
  // we are using context to make the data persist and
  // only fetch when not in last pathname

  useEffect(() => {
    if (locationsStore == null || locationsStore.pathname !== pathname)
      startFetch()
  }, [pathname, city])

  useEffect(() => {
    if (l == null) return
    const uniqueMap = Array.from(new Map(l.map((v) => [hash(v), v])).values())
    setLocationsStore({
      data: uniqueMap,
      pathname,
    })
  }, [l])

  useSetRootBg('gray.50')
  useSetInitialSearch()
  // const { restoreScroll } = useScrollTracker(pathname, true)
  // useEffect(() => {
  //   restoreScroll()
  // }, [pathname])

  useEffect(() => {
    console.log(city)
    if (city == null) return
    if (city === false) window.location.replace('/404.html')
  }, [city])

  return (
    <Fragment>
      <ListSearchBar />
      <TheList data={locationsStore?.data ?? null} />
    </Fragment>
  )
}
