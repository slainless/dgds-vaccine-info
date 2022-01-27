import { StoreProvider } from 'Components/StoreContext'
import { useState } from 'react'

export default function StoreInit({ children }: { children: any }) {
  const lastScroll = useState<any>({})

  const locations = useState<any>(null)

  const regions = useState<any>(null)
  const searchFuse = useState<any>(null)
  const searchInput = useState<any>(null)

  return (
    <StoreProvider
      value={{
        lastScroll,
        locations,
        searchFuse,
        searchInput,
        regions,
      }}
    >
      {children}
    </StoreProvider>
  )
}
