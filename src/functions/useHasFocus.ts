import { useEffect, useState } from 'react'

export default function useHasFocus(
  ref: React.MutableRefObject<HTMLElement | null>,
) {
  const [hasFocus, setFocus] = useState(
    document.hasFocus() && ref?.current?.contains(document.activeElement),
  )

  useEffect(() => {
    if (ref.current == null) return
    ref.current.addEventListener('focus', (e) => setFocus(true))
    ref.current.addEventListener('blur', (e) => setFocus(false))
  }, [ref])

  return { hasFocus, setFocus }
}
