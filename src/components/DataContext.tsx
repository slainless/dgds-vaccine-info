import contextFactory from 'Functions/contextFactory'
import type { CityValue, Locations, ProvinceValue, Region } from 'types/api'
import { useCallback, useContext, useEffect } from 'react'
import { string } from 'superstruct'
import type { City } from 'types/api'
import { cloneDeep, merge } from 'lodash-es'
import hash from 'object-hash'

type Context = {
  regions: Region[] | null
  // locationStore: ReactState<LocationStore | null>
}
export const {
  context: DataContext,
  provider: DataProvider,
  // hook: useDataContext,
} = contextFactory<Context>({
  regions: null,
  // locationStore: [null, () => {}],
})

const isCityValidCache = new Map<string, boolean>()
export function useDataContext() {
  const {
    regions,
    // locationStore: [locationCache, setLocationCache],
  } = useContext(DataContext)

  const isCityValid = useCallback(
    (props: { city: unknown; province: unknown }): props is City => {
      if (regions == null)
        throw new Error(
          'Attempting to access isCityValid function while regions is empty!',
        )
      const { city, province } = props
      const hashed = hash(props)

      let result = isCityValidCache.get(hashed)
      if (result !== undefined) return result

      const region = regions.find((r) => r.province === province)
      result = region != null && !!region.city.find((c) => c === city)
      isCityValidCache.set(hashed, result)
      return result
    },
    [regions],
  )

  // function addLocation({
  //   city,
  //   province,
  //   location,
  // }: City & { location: Locations }) {
  //   setLocationCache((old) => {
  //     const hashed = hash(location)
  //     if (old?.[province]?.[city]?.[hashed] != null) return old

  //     const newEntry = {
  //       [province]: {
  //         [city]: {
  //           [hashed]: location,
  //         },
  //       },
  //     }
  //     if (old == null) return newEntry
  //     return merge(cloneDeep(old), newEntry)
  //   })
  // }

  // function getLocation({
  //   city,
  //   province,
  //   hash,
  // }: City & {
  //   hash: string
  // }) {
  //   return locationCache?.[province]?.[city]?.[hash] ?? null
  // }

  // const locationStore = {
  //   addLocation,
  //   getLocation,
  //   store: locationCache,
  // }
  return {
    regions,
    isCityValid,
    // locationStore
  }
}
