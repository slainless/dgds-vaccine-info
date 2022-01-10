import { DataProvider } from 'Components/DataContext'
import { useFetchRegions } from 'Functions/useFetchRegions'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { LocationStore } from 'types/general'
import { useLocation } from 'react-router-dom'
import { cloneDeep, merge, throttle } from 'lodash-es'
import { useStoreContext } from 'Components/StoreContext'
import useScrollTracker from 'Functions/useScrollTracker'
import useFuzzySearch from 'Functions/useFuzzySearch'
import type { City } from 'types/api'
import Fuse from 'fuse.js'

export default function Startup({ children }: { children: any }) {
  const { startFetch, regions } = useFetchRegions()
  const {
    searchFuse: [_, setSearchFuse],
  } = useStoreContext()
  // const locationStore = useState<LocationStore | null>(null)
  const { pathname } = useLocation()
  // useScrollTracker(pathname, true)

  useEffect(() => {
    startFetch()
  }, [])

  const cities: City[] | null = useMemo(() => {
    if (regions == null) return null
    return regions
      .map((region) =>
        region.city.map((city) => ({ city, province: region.province })),
      )
      .flat()
  }, [regions])

  useEffect(() => {
    if (cities == null) return
    setSearchFuse(new Fuse(cities, { keys: ['city'] }))
  }, [cities])

  return <DataProvider value={{ regions }}>{children}</DataProvider>
}
