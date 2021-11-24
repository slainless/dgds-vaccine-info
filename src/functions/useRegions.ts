import { useEffect, useState } from 'react'
import type { Regions } from 'types/api'
import isValidResponse from './isValidResponse'
import isValidRegions from './isValidRegions'

export function useRegions(options?: { instantStart: boolean }) {
  type O = typeof options
  const { instantStart } = Object.assign<{}, O, Partial<O>>({}, options, {
    instantStart: false,
  })

  const [loading, setLoading] = useState(instantStart)
  const [regions, setRegions] = useState<Regions[]>([])

  function start() {
    fetch('https://api.vaksinasi.id/regions')
      .then((res) => res.json())
      .then((res) => {
        if (isValidResponse(res)) {
        } else
          throw new Error('Oops! Looks like there are some error on API side!')

        if (isValidRegions(res.data)) {
        } else
          throw new Error(
            'Data of regions received is different from the schema',
          )

        setRegions(res.data)
      })
  }

  useEffect(() => {
    if (instantStart) start()
  }, [])

  return { regions, start, loading, _setRegions: setRegions }
}
