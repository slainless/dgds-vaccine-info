// import  React, { useRef, useEffect, useState } from 'react'
// import type { Cities } from 'types/api'
// import type Fuse from 'fuse.js'

// export default function useSearchCity(
//   ref: React.Ref<HTMLInputElement | null>, 
//   fuse: Fuse<Cities>
// ) {
//   const [isEmpty, setEmpty] = useState(true)
//   const [results, setResults] = useState<Fuse.FuseResult<Cities>[]>([])

//   useEffect(() => {
//     if(ref.current == null) return
//     // @ts-ignore
//     if(fuse.getIndex().size() === 0) return

//     const input = ref.current
//     input.value = ''

//     input.addEventListener('input', e => {
//       if(e.target == null) return
//       const target = e.target as HTMLInputElement
//       const searchInput = target.value

//       setEmpty(searchInput === '')
//       setResults(fuse.search(searchInput))
//     })
//   }, [ref, fuse])

//   return { results, isEmpty }
// }