import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import type { City } from 'types/api'
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

  // useEffect(() => {
  //   if (ref.current == null) return
  //   // @ts-ignore
  //   if (fuse.getIndex().size() === 0) return

  //   const input = ref.current
  //   input.value = ''

  //   input.addEventListener('input', (e) => {
  //     if (e.target == null) return
  //     const target = e.target as HTMLInputElement
  //     const searchInput = target.value

  //     setEmpty(searchInput === '')
  //     setResults(fuse.search(searchInput))
  //   })
  // }, [ref, fuse])

  return { results, isEmpty, _fuse: fuse, search }
}
