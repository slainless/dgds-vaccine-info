import { useEffect, useState } from 'react'
import defaultParams from './defaultParams'

export default function useHasFocusWithin(
  ref: React.MutableRefObject<HTMLElement | null>,
  options?: {
    onSetState?: (prevState: boolean, e: FocusEvent) => void
  },
) {
  const { onSetState } = defaultParams(options, {
    onSetState: (prevState, e) => {},
  })
  const [hasFocus, setFocus] = useState<boolean>(
    document.hasFocus() &&
      (ref.current?.contains(document.activeElement) ?? false),
  )

  useEffect(() => {
    const target = ref.current
    if (target == null) return

    function focusInHandler(e: FocusEvent) {
      if (target!.contains(document.activeElement)) {
        setFocus((oldState) => {
          onSetState(oldState, e)
          return true
        })
      }
    }
    document.addEventListener('focusin', focusInHandler)

    function focusOutHandler(e: FocusEvent) {
      if (
        target!.contains(document.activeElement) === false &&
        target!.contains(e.relatedTarget as HTMLElement) === false
      ) {
        setFocus((oldState) => {
          onSetState(oldState, e)
          return false
        })
      }
    }
    document.addEventListener('focusout', focusOutHandler)
    return () => {
      document.removeEventListener('focusin', focusInHandler)
      document.removeEventListener('focusout', focusOutHandler)
    }
  }, [])

  return { hasFocus, setFocus }
}
