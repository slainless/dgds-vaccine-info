import HomeFooter from 'Components/pages/Home/Footer'
import HomeHero from 'Components/pages/Home/Hero'
import HomeSlider from 'Components/pages/Home/Slider'
import useSetRootBg from 'Functions/useSetRootBg'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import 'pure-react-carousel/dist/react-carousel.es.css'

export default function HomePage() {
  const { pathname } = useLocation()
  useSetRootBg(null)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <Fragment>
      <HomeHero
        mb={24}
        // minH={['initial', 'initial', '100vh']}
      />
      <HomeSlider />
      <HomeFooter />
    </Fragment>
  )
}
