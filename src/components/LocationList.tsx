import {
  Box,
  ListItem,
  Spinner,
  UnorderedList,
  VStack,
  Text,
  Portal,
  Button,
  Container,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { useLocations } from 'Functions/useLocations'
import { useEffect, useState } from 'react'
import type { Cities, Locations } from 'types/api'
import LocationItem from './_LocationItem'
import hash from 'object-hash'
import { LocationCache, SessionCache } from '#/cache'
import { RiErrorWarningLine, RiEmotionUnhappyLine } from 'react-icons/ri'

/*
  1. LocationList accept `selectedCity`
  2. selectedCity will be used as input to fetch Locations
  3. Locations then are generated.
*/
export default function LocationList(
  props: Parameters<typeof Box>[0] & {
    selectedCity: Cities | undefined
  },
) {
  const { selectedCity, ...rest } = props
  const { locations, start, loading } = useLocations(selectedCity)
  // // !mock
  // const [locations, setLocations] = useState<Locations[]>([])
  // // !mock
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedCity == null) return
    start().then((_) => {
      // console.log(SessionCache.scrollY)
      // alert(`seles mi loading: ${SessionCache.scrollY}`)
      window.scrollTo({ top: SessionCache.scrollY })
    })
    // // !mock
    // setLocations(
    //   Array(20).fill({
    //     province: 'Sulawesi Selatan',
    //     city: 'Kota Makasar',
    //     title: 'RS Rahasia Alam',
    //     description: 'Rumah Sakit ini adalah blah blah blah',
    //     link: 'https://www.google.com',
    //     address: 'Jl. Rahasia Alam No. 5 Blok C',
    //     map: 'https://www.google.com',
    //     registration: 'Datang Langsung',
    //     agerange: ['Remaja', 'Dewasa', 'Anak-anak'],
    //     isfree: true,
    //     dateadded: '20-10-2021',
    //     datestart: '20-10-2021',
    //     dateend: '20-10-2021',
    //     timestart: '09.00',
    //     timeend: '18.00',
    //     isvalid: true,
    //     code: 'indonesiamaju',
    //   }),
    // )
  }, [selectedCity])

  console.log(locations, selectedCity)

  return (
    <Box {...rest}>
      <VStack hidden={loading} alignItems="stretch">
        {locations.map((location, index) => {
          const locationHash = hash(location)
          return (
            <LocationItem
              location={location}
              key={index}
              to={`detail/${locationHash}`}
              onClick={() => {
                LocationCache[locationHash] = location
                SessionCache.scrollY = window.scrollY
              }}
            />
          )
        })}
      </VStack>
      <Portal>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          hidden={loading === false}
        >
          <Spinner
            boxSize={12}
            thickness="4px"
            emptyColor="gray.200"
            color="green.500"
          ></Spinner>
        </Box>
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          hidden={locations.length > 0 || selectedCity == null || loading}
          width="full"
          px={10}
          opacity={0.7}
        >
          <Icon as={RiEmotionUnhappyLine} boxSize={16} color="red.400" />
          <Text textAlign="center" color="red.400">
            Lokasi Vaksin di {selectedCity?.city} tidak ditemukan...
          </Text>
        </VStack>
      </Portal>
    </Box>
  )
}
