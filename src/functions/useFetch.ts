import { useState } from 'react'

export function useFetch(input: RequestInfo) {
  const [res, setRes] = useState<Response>()

  function start() {
    fetch(input)
      .then(v => setRes(v))
  }

  return { response: res, startFetch: start }
}