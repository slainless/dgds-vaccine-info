import { useDataContext } from 'Components/DataContext'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { apiToValue, urlToValue, valueToApi } from './regionValueNormalizer'
import hash from 'object-hash'

type CityParam = { city: string; province: string } | null
const cityParamCache = new Map<string, CityParam>()
export function useCityParam() {
  const { isCityValid, regions } = useDataContext()
  const params = useParams()
  const { province, city } = params

  return useMemo(() => {
    if (regions == null) return null
    if (province == null || city == null) return null

    const hashed = hash({ province, city })
    let result: CityParam
    if ((result = cityParamCache.get(hashed) ?? null)) return result

    const validParameters = valueToApi(urlToValue({ province, city }))
    result = isCityValid(validParameters) ? apiToValue(validParameters) : null
    cityParamCache.set(hashed, result)
    return result
  }, [params, regions])
}

export function useLocationHashParam() {
  const params = useParams()
  const { locationHash } = params

  return locationHash ?? null
}
