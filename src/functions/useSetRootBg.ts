import { useToken } from '@chakra-ui/react'
import { useEffect } from 'react'

export default function useSetRootBg(color: string | null) {
  const bgColor = useToken('colors', color ?? 'white')
  useEffect(() => {
    document.body.style.backgroundColor = color ? bgColor : ''
  }, [])
}
