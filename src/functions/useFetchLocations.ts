import { useMemo, useState } from 'react'
import type { City, CityValue, Locations, ProvinceValue } from 'types/api'
import isValidResponse from './isValidResponse'
import isValidLocations from './isValidLocations'
import { useFetchJSON } from './useFetchJSON'

export default function useFetchLocations(
  input: City | undefined,
  options?: Parameters<typeof useFetchJSON>[1],
) {
  const { province, city } = input ?? {}
  const { response, ...rest } = useFetchJSON(
    `https://api.vaksinasi.id/locations/${province}?city=${city}`,
    options,
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
