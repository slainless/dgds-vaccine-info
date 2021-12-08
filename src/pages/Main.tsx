import React, { useState, useEffect, useRef } from 'react'
import { useRegions } from 'Functions/useRegions'
import { Spinner, Container, VStack, Portal, Box, Text } from '@chakra-ui/react'
import type { Cities, Regions } from 'types/api'
import SearchCity from 'Components/SearchCity'
import LocationList from 'Components/LocationList'
import { SessionCache } from '#/cache'
import { useSearchParams } from 'react-router-dom'

export default function MainPage() {
  const queryParams = new URL(window.location.href).searchParams
  const queryParamCity = {
    city: queryParams.get('city'),
    province: queryParams.get('province'),
  }
  if (queryParamCity.city && queryParamCity.province) {
    SessionCache.lastSelectedCity = queryParamCity as Cities
    window.history.replaceState(
      {},
      document.title,
      import.meta.env.SNOWPACK_PUBLIC_API_URL ?? '/',
    )
  }

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
    <Container
      maxW="container.sm"
      alignItems="stretch"
      minH="100%"
      display="flex"
      flexDirection="row"
      px={0}
    >
      <VStack
        hidden={isLoadingRegions}
        minH="100%"
        width="100%"
        alignItems="stretch"
        spacing={0}
        position="relative"
        // gridGap={3}
        px={2}
      >
        <SearchCity
          regions={regions}
          onSelectedCity={(city) => {
            setSelectedCity(city)
            SessionCache.lastSelectedCity = city
          }}
          className={selectedCity ? '' : 'middle'}
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
      </Portal>
    </Container>
  )
}
