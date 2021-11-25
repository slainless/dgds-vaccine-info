import React, { ReactElement } from 'react'
import {
  Box,
  Text,
  Grid,
  VStack,
  Button,
  HStack,
  Icon,
  Badge,
  LinkBox,
  LinkOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import type { Locations } from 'types/api'
import {
  RiInformationLine,
  RiRoadMapLine,
  RiMapPinLine,
  RiCloudOffLine,
  RiCloudLine,
  RiHospitalLine,
  RiCommunityLine,
  RiHome5Line,
  RiBuilding4Line,
} from 'react-icons/ri'
import type { IconType } from 'react-icons'
import hash from 'object-hash'
import regMethodNormalizer from 'Functions/regMethodNormalizer'
import { SessionCache } from '#/cache'

export default function LocationItem(
  props: Parameters<typeof LinkBox>[0] & {
    location: Locations
    onOpenDetail?: (location: Locations) => void
  },
) {
  const { location, onOpenDetail, ...rest } = props
  const { display, icon, color } = regMethodNormalizer(location.registration)
  return (
    <LinkBox
      {...rest}
      bgColor="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      px={2}
      py={2}
    >
      <Grid templateColumns="auto max-content" gridGap={3}>
        <VStack alignItems="flex-start" textAlign="left">
          <LinkOverlay
            as={RouterLink}
            to={`detail/${hash(location)}`}
            href="#"
            color="green.600"
            fontWeight="semibold"
            fontSize="sm"
            onClick={() => {
              onOpenDetail?.(location)
              SessionCache.scrollY = window.scrollY
            }}
          >
            {location.title}
          </LinkOverlay>
          <Grid
            templateColumns="max-content auto"
            gridGap={1}
            color="gray.500"
            // alignItems="center"
          >
            <Icon as={icon} />
            <Badge size="xs" width="max-content" colorScheme={color}>
              {display}
            </Badge>
            <Icon as={RiMapPinLine} />
            <Text fontSize="xs">{location.address}</Text>
          </Grid>
        </VStack>
        <VStack alignItems="stretch">
          <Button
            as="a"
            href={location.link}
            size="xs"
            leftIcon={<Icon as={RiInformationLine} transform="scale(1.3)" />}
            target="_blank"
            colorScheme="orange"
            variant="outline"
          >
            Link
          </Button>
          <Button
            as="a"
            href={location.map}
            size="xs"
            leftIcon={<Icon as={RiRoadMapLine} transform="scale(1.3)" />}
            target="_blank"
            variant="outline"
            colorScheme="cyan"
          >
            Map
          </Button>
        </VStack>
      </Grid>
    </LinkBox>
  )
}
