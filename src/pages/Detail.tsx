import { Container, Icon, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import TheDetail from 'Components/pages/Detail/TheDetail'
import type { LocationDetail } from 'Functions/Location'
import { RiArrowRightLine } from 'react-icons/ri'
import { useEffect } from 'react'
import Redirect404 from 'Components/Redirect404'

export default function DetailPage(props: {
  data: LocationDetail | null | false
}) {
  const { data } = props
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  console.log(data)

  return (
    <>
      <Container layerStyle="constraint-sm" py={3}>
        <Link
          as={RouterLink}
          alignItems="center"
          ml="auto"
          p={0}
          display="flex"
          gridGap={2}
          width="max-content"
          opacity={0.8}
          // fontFamily="heading"
          to="../"
        >
          Kembali
          <Icon as={RiArrowRightLine} />
        </Link>
      </Container>
      {data === false ? <Redirect404 /> : <TheDetail data={data} />}
    </>
  )
}
