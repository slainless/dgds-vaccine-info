import {
  Container,
  Heading,
  Icon,
  Portal,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import hash from 'object-hash'
import ListItem from './Item'
import { useLoadingContext } from 'Components/LoadingContext'
import { RiEmotionSadLine } from 'react-icons/ri'
import type { LocationDetail } from 'Functions/Location'

export default function TheList(
  props: Parameters<typeof VStack>[0] & {
    data: LocationDetail[] | null
    onClick: () => void
  },
) {
  const { data, onClick, ...rest } = props
  const { isLoading } = useLoadingContext()

  return (
    <Container
      as={VStack}
      layerStyle="constraint-sm"
      justifyContent="center"
      spacing={0}
      gridGap={3}
      textAlign="center"
      alignItems="stretch"
      py={5}
      pb={20}
      {...rest}
    >
      {data?.map((location, i) => {
        const locationHash = hash(location)
        return (
          <ListItem
            location={location}
            // key={locationHash}
            key={i}
            to={locationHash}
            onClick={onClick}
          />
        )
      })}
      <Portal>
        <VStack
          hidden={isLoading || data == null || data.length > 0}
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          opacity={0.7}
          spacing={0}
          gridGap={4}
          color="red.500"
        >
          <Icon as={RiEmotionSadLine} boxSize={24} />
          <Heading size="sm" maxW="20ch" textAlign="center">
            Lokasi vaksin tidak ditemukan.
          </Heading>
        </VStack>
      </Portal>
    </Container>
  )
}
