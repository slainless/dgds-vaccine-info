import { DataProvider } from 'Components/DataContext'
import { useFetchRegions } from 'Functions/useFetchRegions'
import { useCallback, useEffect, useState } from 'react'
import type { LocationStore } from 'types/general'
import { useLocation } from 'react-router-dom'
import { cloneDeep, merge, throttle } from 'lodash-es'
import { useStoreContext } from 'Components/StoreContext'
import useScrollTracker from 'Functions/useScrollTracker'

export default function Startup({ children }: { children: any }) {
  const { startFetch, regions } = useFetchRegions()
  // const locationStore = useState<LocationStore | null>(null)
  const { pathname } = useLocation()
  // useScrollTracker(pathname, true)

  useEffect(() => {
    startFetch()
  }, [])

  return <DataProvider value={{ regions }}>{children}</DataProvider>
}
