import { useState } from 'react'
import type { Cities, City, Locations, Province } from 'types/api'
import isValidResponse from './isValidResponse'
import isValidLocations from './isValidLocations'

export function useLocations(input?: { province: Province; city: City }) {
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState<Locations[]>([])

  function start() {
    return new Promise<Locations[]>((resolve, reject) => {
      if (input == null) return
      const { province, city } = input
      setLoading(true)
      fetch(`https://api.vaksinasi.id/locations/${province}?city=${city}`)
        .then((res) => res.json())
        .then((res) => {
          if (isValidResponse(res)) {
          } else
            throw new Error(
              'Oops! Looks like there are some error on API side!',
            )

          if (isValidLocations(res.data)) {
          } else
            throw new Error(
              'Data of locations received is different from the schema',
            )

          setLocations(res.data)
          setLoading(false)
          resolve(res.data)
        })
    })
  }

  return { locations, start, loading }
}
