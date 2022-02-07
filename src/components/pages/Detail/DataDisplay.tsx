import {
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import regMethodNormalizer from 'Functions/regMethodNormalizer'
import { DateTime } from 'luxon'
import { MdAccessTimeFilled, MdEventAvailable } from 'react-icons/md'
import { RiExternalLinkFill, RiTeamFill } from 'react-icons/ri'
import type { VidDetail } from '#/types/definition'
import type { LocationDetail } from 'Functions/Location'

const Wrapper = (props: Parameters<typeof VStack>[0]) => (
  <Flex
    flexDir="column"
    py={3}
    px={6}
    sx={{
      '&': {
        borderBottom: '1px solid',
        borderBottomColor: 'gray.100',
      },
    }}
    alignItems="flex-start"
    {...props}
  />
)
const Title = (props: Parameters<typeof Heading>[0]) => (
  <Heading
    // fontSize={12}
    // size="xs"
    size="sm"
    fontWeight="bold"
    // textTransform="uppercase"
    // letterSpacing={1}
    // alignSelf="middle"
    // color="green.600"
    // opacity={0.6}
    mb={3}
    {...props}
  />
)

export default function DataDisplay(props: {
  k: keyof VidDetail
  value: VidDetail[keyof VidDetail]
  location: VidDetail
}) {
  const { value, k, location } = props
  switch (k) {
    case 'timestart':
      return (
        <Wrapper
          order={11}
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Title mb={0}>Jam Buka</Title>
          <Flex alignItems="center" gridGap={2}>
            {/* <Heading fontSize="xs">Jam Operasional</Heading> */}
            <Icon
              as={MdAccessTimeFilled}
              boxSize={4}
              color="blue.500"
              order={2}
            />
            <Text
              fontSize="sm"
              fontFamily="heading"
              fontWeight="semibold"
              order={1}
            >
              {location.timestart.substring(0, 5)} -{' '}
              {location.timeend.substring(0, 5)}
            </Text>
          </Flex>
        </Wrapper>
      )
    case 'datestart':
      return (
        <Wrapper order={12}>
          <Title>Periode Vaksinasi</Title>
          <Flex alignItems="center" gridGap={2} width="100%">
            {/* <Heading fontSize="xs">Jam Operasional</Heading> */}
            <Icon as={MdEventAvailable} boxSize={4} color="red.500" order={1} />
            <Text
              // fontSize="sm"
              // fontFamily="heading"
              // fontWeight="semibold"
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
        </Wrapper>
      )
    case 'description':
      return (
        <Wrapper order={10}>
          <Title>Deskripsi</Title>
          {typeof value == 'string'
            ? value.split('\n').map((v, i) => <Text key={i}>{v}</Text>)
            : null}
        </Wrapper>
      )
    case 'address':
      return (
        <Wrapper order={20}>
          <Title>Alamat</Title>
          <Text>{value}</Text>
          <HStack pt={1}>
            <Icon as={RiExternalLinkFill} color="gray.500" boxSize={4} />
            <Link
              fontSize="sm"
              href={location.map}
              target="_blank"
              variant="highlight"
              fontFamily="heading"
            >
              Buka di Google Map
              {/* <GoogleMapEmbed link={l.map} /> */}
            </Link>
          </HStack>
        </Wrapper>
      )
    case 'registration':
      if (typeof value != 'string') return null
      const { display, icon, color } = regMethodNormalizer(value, true)
      return (
        <Wrapper order={30}>
          <Title>Registrasi</Title>
          <HStack>
            <Icon as={icon} color="gray.500" boxSize={4} />
            <Text>{display}</Text>
          </HStack>
        </Wrapper>
      )
    case 'agerange':
      return (
        <Wrapper order={40}>
          <Title>Rentang Umur</Title>

          <HStack>
            <Icon as={RiTeamFill} color="gray.500" boxSize={4} />
            <div>
              {Array.isArray(value)
                ? value.map((v, i) => <Text key={i}>{v}</Text>)
                : null}
            </div>
          </HStack>
        </Wrapper>
      )
    case 'link':
      if (typeof value != 'string') return null
      let urlDisplay
      try {
        urlDisplay = new URL(value).hostname
      } catch (e) {
        urlDisplay = value
      }
      return (
        <Wrapper order={13}>
          <Title>Tautan</Title>

          <HStack>
            <Icon as={RiExternalLinkFill} color="gray.500" boxSize={4} />
            <Link
              fontSize="sm"
              href={value === urlDisplay ? undefined : value}
              target="_blank"
              variant="highlight"
              fontFamily="heading"
            >
              {urlDisplay}
              {/* <GoogleMapEmbed link={l.map} /> */}
            </Link>
          </HStack>
        </Wrapper>
      )
    // case 'map':
    //   return (
    //     <Wrapper order={5}>
    //       <Title>Peta</Title>
    //       <Text wordBreak="break-word">{value}</Text>
    //     </Wrapper>
    //   )
    default:
      return null
  }
}
