import HomeFooter from 'Components/pages/Home/Footer'
import HomeHero from 'Components/pages/Home/Hero'
import useSetRootBg from 'Functions/useSetRootBg'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function HomePage() {
  const { pathname } = useLocation()
  useSetRootBg(null)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <Fragment>
      <HomeHero />
      <HomeFooter />
    </Fragment>
  )
}
