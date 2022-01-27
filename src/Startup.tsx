import { useFetchRegions } from 'Functions/useFetchRegions'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useStoreContext } from 'Components/StoreContext'
import Fuse from 'fuse.js'
import Indonesia from 'Functions/Indonesia'

export default function Bootstrap({ children }: { children: any }) {
  const { startFetch, regions } = useFetchRegions()
  const {
    searchFuse: [, setSearchFuse],
    regions: [indonesia, setRegions],
  } = useStoreContext()

  // start fetching regions on loading the app
  useEffect(() => {
    startFetch()
  }, [])

  useEffect(() => {
    if (regions == null) return
    setRegions(new Indonesia(regions))
  }, [regions])

  useEffect(() => {
    if (indonesia == null) return
    setSearchFuse(new Fuse(indonesia.cities, { keys: ['city'] }))
  }, [indonesia])

  return <>{children}</>
}
