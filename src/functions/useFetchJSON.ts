import { useState, Dispatch, SetStateAction } from 'react'
import defaultParams from './defaultParams'

type ReactState<T> = [T, Dispatch<SetStateAction<T>>]

type Options = {
  progressState?: ReactState<number>
  loadingState?: ReactState<boolean>
}
export function useFetchJSON<T>(input: RequestInfo, options?: Options) {
  const { progressState, loadingState } = defaultParams(options, {
    progressState: useState(0),
    loadingState: useState(false),
  })
  const [res, setRes] = useState<T>()
  const [progress, setProgress] = progressState
  const [loading, setLoading] = loadingState

  async function start() {
    setLoading(true)
    setProgress(0)
    const response = await fetch(input)
    const reader = response.body!.getReader()

    const contentLength = +response.headers.get('Content-Length')!

    let receivedLength = 0
    let chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      chunks.push(value!)
      receivedLength += value!.length
      setProgress(receivedLength / contentLength)
    }

    const int8Data = new Uint8Array(receivedLength)
    let position = 0
    for (let chunk of chunks) {
      int8Data.set(chunk, position)
      position += chunk.length
    }

    const textData = new TextDecoder('utf-8').decode(int8Data)
    setRes(JSON.parse(textData))
    setLoading(false)
  }

  return {
    response: res,
    setResponse: setRes,
    startFetch: start,
    progress,
    setProgress,
    loading,
    setLoading,
  }
}
