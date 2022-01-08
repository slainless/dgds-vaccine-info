import HomeFooter from 'Components/pages/Home/Footer'
import HomeHero from 'Components/pages/Home/Hero'
import useSetRootBg from 'Functions/useSetRootBg'

export default function HomePage() {
  useSetRootBg(null)
  return (
    <Fragment>
      <HomeHero />
      <HomeFooter />
    </Fragment>
  )
}
