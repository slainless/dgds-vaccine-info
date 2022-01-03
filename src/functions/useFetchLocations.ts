import { useMemo, useState } from 'react'
import type { City } from 'types/api'
import isValidResponse from './isValidResponse'
import isValidLocations from './isValidLocations'
import useFetchJSON from './useFetchJSON'

export default function useFetchLocations(input: City | null) {
  const { province, city } = input ?? {}
  const { response, ...rest } = useFetchJSON(
    `https://api.vaksinasi.id/locations/${province}?city=${city}`,
    { name: 'location' },
  )
  const locations = useMemo(() => {
    if (response == null) return null
    if (isValidResponse(response)) {
    } else throw new Error('Oops! Looks like there are some error on API side!')

    if (isValidLocations(response.data)) {
    } else
      throw new Error('Data of regions received is different from the schema')

    return response.data
  }, [response])

  return { locations, ...rest }
}
