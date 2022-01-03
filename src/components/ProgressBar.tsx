import { Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useLoadingContext } from './LoadingContext'

export default function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)
  const { isLoading, totalProgress } = useLoadingContext()
  // const [isLoading, setLoading] = loading
  // const [progress, setProgress] = prog
  const [isHidden, setHidden] = useState(true)

  const timing = 0.75
  const startingOffset = 0.05
  const delayBeforeHidden = 1

  useEffect(() => {
    if (isLoading) setHidden(false)
  }, [isLoading])

  useEffect(() => {
    if (ref.current == null) return
    if (totalProgress == null) return
    ref.current.style.width = `${
      (totalProgress * (1 - startingOffset) + startingOffset) * 99.8
    }%`

    if (totalProgress === 1)
      setTimeout(() => setHidden(true), (timing + delayBeforeHidden) * 1000)
  }, [totalProgress])

  return (
    <Box
      position="fixed"
      top={0}
      hidden={isHidden}
      transition={`all ${timing}s`}
      transitionTimingFunction="ease-out"
      bgColor="green"
      height="3px"
      zIndex="overlay"
      ref={ref}
    ></Box>
  )
}
