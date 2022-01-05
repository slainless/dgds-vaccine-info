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

const isCityValidCache = new Map<string, boolean>()
export function useDataContext() {
  const { regions } = useContext(DataContext)
  const isCityValid = useCallback(
    (props: { city: unknown; province: unknown }): props is City => {
      if (regions == null)
        throw new Error(
          'Attempting to access isCityValid function while regions is empty!',
        )
      const { city, province } = props
      const hashed = hash(props)

      let result: boolean
      if ((result = isCityValidCache.get(hashed) !== undefined)) return result

      const region = regions.find((r) => r.province === province)
      result = region != null && !!region.city.find((c) => c === city)
      isCityValidCache.set(hashed, result)
      return result
    },
    [regions],
  )

  return { regions, isCityValid }
}
