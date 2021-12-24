import { useState, useEffect, useRef } from 'react'
import { useRegions } from 'Functions/useRegions'
import {
  Spinner,
  Container,
  VStack,
  Portal,
  Box,
  Text,
  Icon,
  Image,
} from '@chakra-ui/react'
import type { Cities, Regions } from 'types/api'
import SearchCity from 'Components/SearchCity'
import LocationList from 'Components/LocationList'
import { SessionCache } from '#/cache'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { RiEmotionUnhappyLine } from 'react-icons/ri'

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchLastSelectedCity = searchParams.get('lsc')
  const searchScrollY = searchParams.get('Y')
  const searchCity = searchParams.get('city')
  const searchProvince = searchParams.get('province')

  if (searchCity && searchProvince) {
    SessionCache.lastSelectedCity = {
      city: searchCity,
      province: searchProvince,
    }
  }

  if (searchLastSelectedCity) {
    SessionCache.lastSelectedCity = JSON.parse(
      atob(decodeURIComponent(searchLastSelectedCity)),
    )
  }

  if (searchScrollY) {
    SessionCache.scrollY = Number.parseFloat(searchScrollY)
  }

  useEffect(() => {
    window.history.replaceState({}, document.title, PUBLIC_URL('#/'))
  }, [])

  const { regions, start: fetchRegions, _setRegions } = useRegions()
  // // !mock
  // const [regions, setRegions] = useState<Regions[]>([])

  const [isLoadingRegions, setLoadingRegions] = useState(
    SessionCache.regions.length === 0,
  )

  // const [selectedCity, setSelectedCity] = useState<Cities>(
  //   JSON.parse(sessionStorage.getItem(SELECTED_CITY_KEY) ?? 'null'),
  // )
  const [selectedCity, setSelectedCity] = useState<Cities | undefined>(
    SessionCache.lastSelectedCity,
  )

  useEffect(() => {
    // const cachedRegions = JSON.parse(
    //   sessionStorage.getItem(REGION_LIST_KEY) ?? 'null',
    // )
    const cachedRegions = SessionCache.regions

    if (cachedRegions.length !== 0) _setRegions(cachedRegions)
    else fetchRegions()
    // // !mock
    // setRegions([
    //   { province: 'Sulawesi Selatan', city: ['Kota Makasar', 'Kota Medan'] },
    // ])
  }, [])

  useEffect(() => {
    if (regions.length === 0) return
    setLoadingRegions(false)
    SessionCache.regions = regions
    // sessionStorage.setItem(REGION_LIST_KEY, JSON.stringify(regions))
  }, [regions])

  return (
    <Fragment>
      <Helmet>
        <title>
          {selectedCity
            ? `Lokasi Vaksin di ${selectedCity.city}`
            : `Lokasi Vaksinasi by DIGIDES`}
        </title>
      </Helmet>
      <VStack
        hidden={isLoadingRegions}
        minH="100%"
        width="100%"
        alignItems="stretch"
        spacing={0}
        position="relative"
        // gridGap={3}
      >
        <SearchCity
          regions={regions}
          onSelectedCity={(city) => {
            setSelectedCity(city)
            SessionCache.lastSelectedCity = city
          }}
          // className={selectedCity ? '' : 'middle'}
          position="sticky"
          py={3}
          bgColor="rgba(255,255,255,0.4)"
          backdropFilter="auto"
          backdropBlur="sm"
          top={0}
          zIndex="docked"
          transition="all 0.2s"
          transitionTimingFunction="ease-in-out"
          sx={{
            '&.middle': {
              top: '25%',
              transform: 'translateY(-50%)',
            },
            '&.middle:focus-within': {
              top: '0',
              transform: 'none',
            },
          }}
        />
        <LocationList selectedCity={selectedCity} px={2} pb={3} />
      </VStack>

      <Portal>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          hidden={isLoadingRegions === false}
        >
          <Spinner
            boxSize={16}
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
          hidden={selectedCity != null || isLoadingRegions}
          width="full"
          opacity={0.5}
          px={10}
        >
          <Box boxSize={32} mb={5}>
            <Image src={PUBLIC_URL('assets/vaccine_mono.svg')} />
          </Box>
          <Text
            textAlign="center"
            color="green.600"
            fontWeight="semibold"
            maxW="sm"
          >
            Temukan lokasi vaksin terdekat di kota/kabupaten mu!
          </Text>
        </VStack>
      </Portal>
    </Fragment>
  )
}
