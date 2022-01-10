import { Button, Container, HStack, Icon, Link } from '@chakra-ui/react'
import { RiArrowLeftLine, RiArrowLeftSLine } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'

export default function LocationBackButton(
  props: Parameters<typeof Container>[0],
) {
  const { ...rest } = props
  return (
    <Container {...rest}>
      <Link
        as={RouterLink}
        to={'..'}
        layerStyle="constraint-sm"
        alignItems="center"
        p={0}
        display="flex"
        gridGap={2}
        width="max-content"
        opacity={0.8}
        // fontFamily="heading"
      >
        <Icon as={RiArrowLeftLine} />
        Kembali
      </Link>
    </Container>
  )
}
