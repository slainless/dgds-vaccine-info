import { DataProvider } from 'Components/DataContext'
import { useFetchRegions } from 'Functions/useFetchRegions'
import { useEffect } from 'react'

export default function Startup({ children }: { children: any }) {
  const { startFetch, regions } = useFetchRegions()

  useEffect(() => {
    startFetch()
  }, [])
  return <DataProvider value={{ regions }}>{children}</DataProvider>
}
