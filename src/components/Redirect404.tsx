import { useEffect } from 'react'

export default function Redirect404() {
  window.location.replace('/404.html')
  return <></>
}
