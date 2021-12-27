import { useEffect, useMemo, useState } from 'react'
import type { Region } from 'types/api'
import isValidResponse from './isValidResponse'
import isValidRegions from './isValidRegions'
import defaultParams from './defaultParams'
import { useFetchJSON } from 'Functions/useFetchJSON'

export function useFetchRegions(options?: Parameters<typeof useFetchJSON>[1]) {
  const { response, ...rest } = useFetchJSON(
    'https://api.vaksinasi.id/regions',
    options,
  )
  const regions = useMemo(() => {
    if (response == null) return null
    if (isValidResponse(response)) {
    } else throw new Error('Oops! Looks like there are some error on API side!')

    if (isValidRegions(response.data)) {
    } else
      throw new Error('Data of regions received is different from the schema')

    return response.data
  }, [response])

  return { regions, ...rest }
}
