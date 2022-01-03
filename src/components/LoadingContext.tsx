import contextFactory from 'Functions/contextFactory'
import { useCallback, useContext, useEffect, useMemo } from 'react'
import { values } from 'lodash-es'

type Context = {
  loading: ReactState<boolean>
  progress: ReactState<Record<string, number>>
}
export const {
  context: LoadingContext,
  provider: LoadingProvider,
  // hook: useLoadingContext,
} = contextFactory<Context>({
  loading: [false, (_) => _],
  progress: [{}, (_) => _],
})

export function useLoadingContext() {
  const {
    loading: [loading, setLoading],
    progress: [progress, setProgress],
  } = useContext(LoadingContext)

  /**
   * Set a progress value. Should be in 0-1 decimal range.
   *
   * @param {string} name Name of the progress. Should not overlapped.
   * @param {number} value
   */
  const _setProgress = (name: string, value: number) => {
    setProgress((prev) => {
      const newValue = { ...prev }
      newValue[name] = value
      return newValue
    })
  }

  const totalProgress = useMemo(() => {
    if (Object.keys(progress).length === 0) return null
    return (
      values(progress).reduce((a, b) => a + b) / Object.keys(progress).length
    )
  }, [progress])
  const isLoading = useMemo(
    () => totalProgress != null && totalProgress < 1,
    [totalProgress],
  )
  const getProgress = useCallback((name: string) => progress[name], [progress])

  return { totalProgress, setProgress: _setProgress, isLoading, getProgress }
}
