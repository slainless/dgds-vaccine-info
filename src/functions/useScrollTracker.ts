import { useStoreContext } from 'Components/StoreContext'
import { useCallback, useEffect, useState } from 'react'
import { cloneDeep, merge, throttle } from 'lodash-es'

export default function useScrollTracker(id: string, track = false) {
  const { lastScroll } = useStoreContext()
  const [scrollList, setScrollList] = lastScroll
  // const [isTracking, setTracking] = useState(false)

  const scrollTrack = useCallback(
    throttle(() => {
      setScrollList((old) => {
        return merge<typeof old, typeof old>(cloneDeep(old), {
          [id]: {
            left: window.scrollX,
            top: window.scrollY,
          },
        })
      })
    }, 100),
    [id],
  )

  useEffect(() => {
    if (track == false) return
    document.addEventListener('scroll', scrollTrack)
    return () => document.removeEventListener('scroll', scrollTrack)
  }, [id])

  // const startTracking = () => setTracking(true)
  // const stopTracking = () => setTracking(false)
  // const toggleTracking = () => setTracking((old) => !old)
  const restoreScroll = useCallback(
    (smooth = false) => {
      window.scrollTo({
        ...scrollList[id],
        behavior: smooth ? 'smooth' : undefined,
      })
    },
    [id],
  )

  return {
    // startTracking,
    // stopTracking,
    // toggleTracking,
    restoreScroll,
  }
}
