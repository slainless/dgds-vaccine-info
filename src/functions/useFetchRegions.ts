import { useMemo } from 'react'
import useFetchJSON from 'Functions/useFetchJSON'
import { assertRegion } from './Region'

export function useFetchRegions() {
  const { response, ...rest } = useFetchJSON(
    'https://api.vaksinasi.id/regions',
    { name: 'region' },
  )
  const regions = useMemo(() => {
    if (response == null) return null
    assertRegion(response)

    return response.data
  }, [response])

  return { regions, ...rest }
}
