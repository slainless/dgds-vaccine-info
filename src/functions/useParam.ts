import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import hash from 'object-hash'
import { useStoreContext } from 'Components/StoreContext'
import { ApiSource } from '#/types/definition'

type CityParam = { city: string; province: string } | null | false
const cityParamCache = new Map<string, CityParam>()
export function useCityParam() {
  const {
    regions: [regions],
  } = useStoreContext()
  const params = useParams()
  const { province, city } = params

  return useMemo(() => {
    if (regions == null) return null
    if (province == null || city == null) return null

    const hashed = hash({ province, city })
    let result: CityParam
    if ((result = cityParamCache.get(hashed) ?? null)) return result

    result = regions.toValidUnified({ province, city }, 'url') ?? false
    cityParamCache.set(hashed, result)
    return result
  }, [params, regions])
}

export function useLocationHashParam() {
  const params = useParams()
  const { locationHash } = params

  return locationHash ?? null
}
