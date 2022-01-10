import {
  Container,
  Heading,
  Icon,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { Locations } from 'types/api'
import hash from 'object-hash'
import { LocationDetailCache } from '#/cache'
import ListItem from './Item'
import { useEffect, useState } from 'react'
import { useLoadingContext } from 'Components/LoadingContext'
import { RiEmotionSadLine } from 'react-icons/ri'

export default function TheList(
  props: Parameters<typeof VStack>[0] & {
    data: Locations[] | null
  },
) {
  const { data, ...rest } = props
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
    >
      {data?.map((location, i) => {
        const locationHash = hash(location)
        return (
          <ListItem
            location={location}
            // key={locationHash}
            key={i}
            to={locationHash}
            onClick={() => {}}
          />
        )
      })}
      <Portal>
        <VStack
          hidden={isLoading || data == null || data.length > 1}
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
