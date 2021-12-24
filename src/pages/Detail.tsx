import { LocationCache, SessionCache } from '#/cache'
import {
  Container,
  Table,
  Td,
  Tr,
  Text,
  Link,
  Tbody,
  Box,
  Heading,
  HStack,
  Icon,
  Badge,
} from '@chakra-ui/react'
import { ReactElement, useEffect } from 'react'
import { useParams } from 'react-router'
import type { Locations } from 'types/api'
import {
  RiTimeLine,
  RiTimeFill,
  RiMapPinLine,
  RiFileList3Line,
  RiUserAddLine,
  RiTeamLine,
  RiInformationLine,
  RiCalendar2Line,
  RiCalendar2Fill,
  RiGroup2Line,
  RiGroup2Fill,
  RiTeamFill,
  RiExternalLinkFill,
} from 'react-icons/ri'
import type { IconType } from 'react-icons'
import regMethodNormalizer from 'Functions/regMethodNormalizer'
import GoogleMapEmbed from 'Components/GMapEmbed'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const TablesBody: [
  title: string,
  icon?: IconType,
  value?: (l: Locations) => any,
][] = [
  [
    'Deskripsi',
    RiFileList3Line,
    (l) =>
      l.description.split('\n').map((v, i) => (
        <Text fontSize="inherit" key={i}>
          {v}
        </Text>
      )),
  ],
  [
    'Alamat',
    RiMapPinLine,
    (l) => (
      <>
        <Text fontSize="inherit">{l.address}</Text>
        <HStack mt={1}>
          <Icon as={RiExternalLinkFill} color="gray.500" boxSize={4} />
          <Text fontSize="inherit">
            <GoogleMapEmbed link={l.map} />
          </Text>
        </HStack>
      </>
    ),
  ],
  [
    'Jam Buka',
    RiTimeLine,
    (l) => (
      <HStack>
        <Icon as={RiTimeFill} color="gray.500" boxSize={4} />
        <Text fontSize="inherit">
          {l.timestart} - {l.timeend}
        </Text>
      </HStack>
    ),
  ],
  [
    'Registrasi',
    RiUserAddLine,
    (l) => {
      const { display, icon, color } = regMethodNormalizer(l.registration, true)
      return (
        <HStack>
          <Icon as={icon} color="gray.500" boxSize={4} />
          <Text fontSize="inherit">{display}</Text>
        </HStack>
      )
    },
  ],
  [
    'Rentang Umur',
    RiTeamLine,
    (l) => (
      <HStack>
        <Icon as={RiTeamFill} color="gray.500" boxSize={4} />
        <Box>
          {l.agerange.map((v, i) => (
            <Text fontSize="inherit" key={i}>
              {v}
            </Text>
          ))}
        </Box>
      </HStack>
    ),
  ],
  [
    'Tautan',
    RiInformationLine,
    (l) => (
      <HStack>
        <Icon as={RiExternalLinkFill} color="gray.500" boxSize={4} />
        <Text fontSize="inherit">
          <Link
            href={l.link}
            target="_blank"
            children={new URL(l.link).hostname}
            variant="highlight"
          />
        </Text>
        {/* <Text fontSize="inherit">
          <Link href={l.map} target="_blank">
            Google Maps
          </Link>
        </Text> */}
      </HStack>
    ),
  ],
  [
    'Periode Vaksinasi',
    RiCalendar2Line,
    (l) => (
      <HStack>
        <Icon as={RiCalendar2Fill} color="gray.500" boxSize={4} />
        <Text fontSize="inherit">
          {l.datestart} s/d {l.dateend}
        </Text>
      </HStack>
    ),
  ],
]

export default function InformationPage() {
  const { locationHash } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = LocationCache[locationHash!]

  if (location == null) {
    window.location.href =
      (import.meta.env.SNOWPACK_PUBLIC_API_URL ?? '/') +
      `#/?${searchParams.toString()}`
    return <></>
  }

  useEffect(() => {
    if (searchParams.has('lsc')) return

    window.history.replaceState(
      {},
      document.title,
      window.location.href +
        `?Y=${SessionCache.scrollY}&lsc=${btoa(
          JSON.stringify(SessionCache.lastSelectedCity),
        )}`,
    )
  }, [])
  // // !mock
  // const location = {
  //   province: 'Sulawesi Selatan',
  //   city: 'Kota Makasar',
  //   title: 'RS Sayang Rakyat',
  //   datestart: '2021-08-19',
  //   dateend: '2022-03-31',
  //   timestart: '08:00:00',
  //   timeend: '14:00:00',
  //   registration: 'Datang Langsung',
  //   agerange: ['Remaja (12-17 Tahun)', 'Dewasa (18-59 Tahun)', 'Lansia (60- )'],
  //   description:
  //     '1. Hanya melayani Selasa & Kamis \n2. Melayani vaksin dosis ke 2\n3. Pelayanan perhari 50 orang',
  //   link: 'https://www.instagram.com/p/CSwc2_5potz/?utm_medium=copy_link',
  //   address:
  //     'Jl. Pahlawan No.10000, Bulurokeng, Kec. Biringkanaya, Kota Makassar, Sulawesi Selatan 90243',
  //   map: 'https://www.google.com/maps/dir/-5.1459234,119.4362214/RSUD+Sayang+Rakyat,+Jl.+Pahlawan+No.10000,+Bulurokeng,+Biringkanaya,+Makassar+City,+South+Sulawesi+90243/@-5.111955,119.4230638,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x2dbefc10cbd85cf9:0x9525e1e47b305e0d!2m2!1d119.493711!2d-5.0755539',
  //   isfree: true,
  //   isvalid: true,
  //   code: 'indorelawan',
  //   dateadded: '2021-08-22',
  // }
  return (
    <Container
      maxW="container.sm"
      justifyContent="center"
      alignItems="center"
      minH="100%"
      display="flex"
      flexDirection="column"
      px={4}
      pb={3}
    >
      <Helmet>
        <title>{`${location.title} di ${SessionCache.lastSelectedCity?.city}`}</title>
      </Helmet>
      <Heading as="h1" size="sm" my={4} color="green.500">
        {location.title}
      </Heading>
      <Box border="1px solid" borderColor="gray.100" borderRadius="md">
        <Table fontSize="sm">
          <Tbody>
            {TablesBody.map((v, i) => (
              <Tr
                key={i}
                borderBottom="1px solid"
                borderColor="gray.100"
                sx={{
                  '&:last-of-type': {
                    borderBottom: 'none',
                  },
                }}
              >
                <Td
                  display={['flex', 'table-cell']}
                  border="none"
                  px={2}
                  pt={4}
                  pb={[0, 4]}
                  color="gray.500"
                  fontWeight="medium"
                >
                  <HStack>
                    {/* <Icon as={v[1]} /> */}
                    <Text fontSize="inherit">{v[0]}</Text>
                  </HStack>
                </Td>
                <Td
                  display={['flex', 'table-cell']}
                  px={2}
                  pb={4}
                  pt={[2, 4]}
                  border="none"
                  flexDirection="column"
                >
                  {v[2]?.(location)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  )
}
