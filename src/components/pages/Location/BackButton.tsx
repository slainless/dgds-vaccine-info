import { Button, Container, HStack, Icon, Link } from '@chakra-ui/react'
import { RiArrowLeftLine, RiArrowLeftSLine } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'

export default function LocationBackButton() {
  return (
    <Container py={3}>
      <Link
        as={RouterLink}
        to={'../'}
        alignItems="center"
        display="flex"
        gridGap={2}
        width="max-content"
        opacity={0.8}
        // fontFamily="heading"
      >
        <Icon as={RiArrowLeftSLine} />
        Kembali
      </Link>
    </Container>
  )
}
