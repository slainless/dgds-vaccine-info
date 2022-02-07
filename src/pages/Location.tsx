import { useStoreContext } from 'Components/StoreContext'
import useFetchLocations from 'Functions/useFetchLocations'
import { useCityParam } from 'Functions/useParam'
import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Outlet, useLocation, useParams } from 'react-router-dom'
import hash from 'object-hash'
import useSetRootBg from 'Functions/useSetRootBg'
import useSetInitialSearch from 'Functions/useSetInitialSearch'
import ListPage from './List'
import DetailPage from './Detail'
import Redirect404 from 'Components/Redirect404'

export default function LocationPage() {
  const city = useCityParam()
  const { locations, fetch } = useFetchLocations(city ? city : null)

  // only fetch when locationsStore is null or
  // locationsStore.pathname is not current pathname
  //
  // we are using context to make the data persist and
  // only fetch when not in last pathname

  useEffect(() => {
    if (city == null) return
    fetch()
  }, [city])

  const data = useMemo(() => {
    if (locations == null) return null
    const hashMap = new Map(locations.map((v) => [hash(v), v]))
    return hashMap
  }, [locations])

  useSetRootBg('gray.50')
  useSetInitialSearch()
  // const { restoreScroll } = useScrollTracker(pathname, true)
  // useEffect(() => {
  //   restoreScroll()
  // }, [pathname])

  useEffect(() => {
    if (city === null) return
    if (city === false) window.location.replace('/404.html')
  }, [city])

  const locationHash = useParams()['*']!
  const scrollState = useState<[number, number]>([0, 0])

  return (
    <>
      <ListPage
        hidden={!!locationHash}
        data={data ? Array.from(data.values()) : null}
        scrollState={scrollState}
      />
      <Routes>
        <Route path="/">
          <Route index element={<></>} />
          <Route
            path=":locationHash"
            element={
              <DetailPage
                data={data ? data.get(locationHash) ?? false : null}
              />
            }
          />
          <Route path="*" element={<Redirect404 />} />
        </Route>
      </Routes>
    </>
  )
}
