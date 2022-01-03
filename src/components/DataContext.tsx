import contextFactory from 'Functions/contextFactory'
import type { Region } from 'types/api'
import { useCallback, useContext } from 'react'
import { string } from 'superstruct'
import type { City } from 'types/api'

type Context = {
  regions: Region[] | null
}
export const {
  context: DataContext,
  provider: DataProvider,
  // hook: useDataContext,
} = contextFactory<Context>({
  regions: null,
})

export function useDataContext() {
  const { regions } = useContext(DataContext)
  const isCityValid = useCallback(
    (props: { city: unknown; province: unknown }): props is City => {
      if (regions == null)
        throw new Error(
          'Attempting to access isCityValid function while regions is empty!',
        )
      const { city, province } = props
      const region = regions.find((r) => r.province === province)
      if (region != null && region.city.find((c) => c === city)) return true
      return false
    },
    [regions],
  )

  return { regions, isCityValid }
}
