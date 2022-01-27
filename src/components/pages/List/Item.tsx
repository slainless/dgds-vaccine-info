import {
  Badge,
  Button,
  Flex,
  Text,
  Heading,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  VStack,
} from '@chakra-ui/react'
import regMethodNormalizer from 'Functions/regMethodNormalizer'
import { DateTime } from 'luxon'
import {
  MdAccessTimeFilled,
  MdEventAvailable,
  MdLocationOn,
} from 'react-icons/md'
import type { LocationDetail, VidDetail } from 'types/data'
import hash from 'object-hash'
// import { Link as RouterLink } from 'react-router-dom'
import { useEffect } from 'react'

export default function ListItem(
  props: Parameters<typeof LinkBox>[0] & {
    // Parameters<typeof RouterLink>[0] &
    location: VidDetail
  },
) {
  const { location, to, ...rest } = props

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
      // hidden={true}
      pt={4}
      pb={2}
      px={5}
      spacing={0}
      gridGap={4}
      // templateColumns="auto max-content"
      alignItems="stretch"
      {...rest}
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
            <LinkOverlay
            // as={RouterLink}
            // to={to}
            >
              {location.title}
            </LinkOverlay>
          </Heading>
          <Text fontSize="0.825rem" color="gray.500">
            <Icon as={MdLocationOn} mr={1} color="gray.300" boxSize={4} />
            {location.address}
          </Text>
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
