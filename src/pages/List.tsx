import { Box, VStack } from '@chakra-ui/react'
import TheList from 'Components/pages/List/TheList'
import ListSearchBar from 'Components/pages/List/SearchBar'
import useFetchLocations from 'Functions/useFetchLocations'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useCityParam } from 'Functions/useParam'
import hash from 'object-hash'
import useSetRootBg from 'Functions/useSetRootBg'
import { useStoreContext } from 'Components/StoreContext'
import useSetInitialSearch from 'Functions/useSetInitialSearch'
import { ApiSource, DetailMeta } from '#/types/definition'
import type { LocationDetail } from 'Functions/Location'

export default function ListPage(
  props: {
    data: LocationDetail[] | null
    scrollState: ReactState<[number, number]>
  } & Parameters<typeof Box>[0],
) {
  const { data, scrollState, ...rest } = props
  const [lastState, setLastState] = scrollState

  useEffect(() => {
    window.scrollTo(...lastState)
  })

  return (
    <Box {...rest}>
      <ListSearchBar />
      <TheList
        data={data}
        onClick={() => setLastState([window.scrollX, window.scrollY])}
      />
    </Box>
  )
}
