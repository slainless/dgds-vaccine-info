// !DEPRECATED, NOTE: FOR REFERENCE ONLY
import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import type { UCity } from 'types/data'
import Fuse from 'fuse.js'
import { cloneDeep } from 'lodash-es'

export default function useFuzzySearch<T>(
  data: T[] | null,
  options?: Fuse.IFuseOptions<T>,
) {
  const [isEmpty, setEmpty] = useState(true)
  const [results, setResults] = useState<Fuse.FuseResult<T>[]>([])
  const fuse = useMemo(() => {
    if (data == null) return new Fuse<T>([])
    return new Fuse<T>(data, options)
  }, [data])
  const search = useCallback(
    (...props: Parameters<Fuse<T>['search']>) => {
      const result = fuse.search(...props)
      setResults(result)
      return result
    },
    [fuse],
  )

  return { results, isEmpty, _fuse: fuse, search }
}
