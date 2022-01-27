import { useMemo, useState } from 'react'
import type { UCity } from 'types/data'
import isValidResponse from './isValidResponse'
import isValidLocations from './isValidLocations'
import useFetchJSON from './useFetchJSON'
import { useStoreContext } from 'Components/StoreContext'
import { ApiSource } from '#/definition'

type VidUrl = `https://api.vaksinasi.id/locations/${string}?city=${string}`
type KipiUrl = `https://kipi.covid19.go.id/api/get-faskes-vaksinasi`

export default function useFetchLocations(input: UCity | null) {
  const {
    regions: [regions],
  } = useStoreContext()

  const apiCity = input
    ? regions?.toApi(input, ApiSource.VAKSINASI_ID) ?? null
    : null
  const url = apiCity
    ? `https://api.vaksinasi.id/locations/${apiCity.province}?city=${apiCity.city}`
    : null

  const { response, ...rest } = useFetchJSON(url, { name: 'location' })
  const locations = useMemo(() => {
    if (response == null) return null
    if (isValidResponse(response)) {
    } else throw new Error('Oops! Looks like there are some error on API side!')

    const data = response.data
    if (isValidLocations(data)) {
    } else
      throw new Error('Data of regions received is different from the schema')

    return data
  }, [response])

  return { locations, ...rest }
}
