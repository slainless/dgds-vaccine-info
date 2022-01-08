import {
  Container,
  VStack,
  Text,
  Heading,
  Box,
  Grid,
  Button,
  HStack,
  Icon,
  Badge,
  Flex,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import type { City, Locations } from 'types/api'
import { RiBuildingLine, RiMapPin2Fill } from 'react-icons/ri'
import { FcClock } from 'react-icons/fc'
import {
  MdLocationOn,
  MdAccessTimeFilled,
  MdEventAvailable,
} from 'react-icons/md'
import regMethodNormalizer from 'Functions/regMethodNormalizer'
import { Link as RouterLink } from 'react-router-dom'
import hash from 'object-hash'
import { useDataContext } from 'Components/DataContext'
import { urlToValue } from 'Functions/regionValueNormalizer'
import { LocationDetailCache } from '#/cache'
import { useCityParam } from 'Functions/useValidParams'
import { DateTime } from 'luxon'

function LocationItem(props: { location: Locations }) {
  const { location } = props

  const regMethod = regMethodNormalizer(location.registration)
  return (
    <LinkBox
      display="flex"
      flexDir="column"
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="md"
      bgColor="white"
      pt={4}
      pb={2}
      px={5}
      spacing={0}
      gridGap={4}
      // templateColumns="auto max-content"
      alignItems="stretch"
      onClick={() => {
        // addLocation({ ...urlToValue({ province, city }), location })
        LocationDetailCache[hash(location)] = location
      }}
    >
      <Flex gridGap={2}>
        <VStack
          className="info"
          gridGap={1}
          spacing={0}
          textAlign="left"
          alignItems="flex-start"
          flexGrow={1}
        >
          <Heading
            size="sm"
            letterSpacing={0.3}
            // color="green.600"
            fontWeight="bold"
            mb={2}
          >
            <LinkOverlay as={RouterLink} to={hash(location)}>
              {location.title}
            </LinkOverlay>
          </Heading>
          {/* <Flex> */}
          <Text fontSize="0.825rem" color="gray.500">
            <Icon as={MdLocationOn} mr={1} color="gray.300" boxSize={4} />
            {location.address}
          </Text>
          {/* </Flex> */}
        </VStack>
        <VStack className="link" width="max-content" alignItems="stretch">
          <Button size="xs" as="a" href={location.link} target="_blank">
            Tautan
          </Button>
          <Button size="xs" as="a" href={location.map} target="_blank">
            Peta
          </Button>
        </VStack>
      </Flex>

      <HStack
        borderTop="1px solid"
        borderTopColor="gray.100"
        pt={2}
        fontSize="sm"
        justifyContent="space-between"
        flexWrap="wrap"
        gridGap={1}
        spacing={0}
      >
        <Flex opacity={0.8} alignItems="center">
          <Icon
            as={regMethod.icon}
            mr={2}
            color={`${regMethod.color}.300`}
            boxSize={4}
          />
          <Badge
            colorScheme={regMethod.color}
            size="xs"
            fontFamily="heading"
            letterSpacing={0.2}
          >
            {regMethod.display}
          </Badge>
        </Flex>
        <Flex alignItems="center" opacity={0.6} gridGap={2}>
          {/* <Heading fontSize="xs">Jam Operasional</Heading> */}
          <Icon
            as={MdAccessTimeFilled}
            boxSize={4}
            color="blue.500"
            order={2}
          />
          <Text
            fontSize="xs"
            fontFamily="heading"
            fontWeight="semibold"
            order={1}
          >
            {location.timestart.substring(0, 5)} -{' '}
            {location.timeend.substring(0, 5)}
          </Text>
        </Flex>
        <Flex alignItems="center" opacity={0.6} gridGap={2} width="100%">
          {/* <Heading fontSize="xs">Jam Operasional</Heading> */}
          <Icon as={MdEventAvailable} boxSize={4} color="red.500" order={1} />
          <Text
            fontSize="xs"
            fontFamily="heading"
            fontWeight="semibold"
            order={2}
          >
            {DateTime.fromSQL(location.datestart).toLocaleString(
              DateTime.DATE_MED,
            )}{' '}
            -{' '}
            {DateTime.fromSQL(location.dateend).toLocaleString(
              DateTime.DATE_MED,
            )}
          </Text>
        </Flex>
      </HStack>
    </LinkBox>
  )
}

export default function ListLocationsList(
  props: Parameters<typeof VStack>[0] & {
    data: Locations[] | null
  },
) {
  const { data, ...rest } = props
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
      {data?.map((location, i) => (
        <LocationItem location={location} key={i} />
      ))}
    </Container>
  )
}
