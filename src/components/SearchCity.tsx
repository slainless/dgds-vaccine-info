import {
  Box,
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import type Fuse from 'fuse.js'
import { useEffect, useRef, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import type { City, Region } from 'types/api'
import SearchInput from './_SearchInput'
import SearchResultList from './_SearchResultList'
import { SessionCache } from '#/cache'

/*
  1. SearchCity accept regions props
  2. regions are being processed by SearchInput.
    2a. SearchInput is a HTMLInputElement
    2b. Every input in SearchInput will trigger `inputHandler()`
    2c. `inputHandler()` will filter regions using fuzzy search
    2d. filtered result will be passed back via `onSearchResults: (res) => void`
  3. `onSearchResults` will dump results to `results` state
  4. SearchResultList will read those `results` and generate list of regions
  5. `onClickResult: (res) => void` will be called everytime a region in `SearchResultList` is clicked.
*/
export default function SearchCity(
  props: Parameters<typeof Box>[0] & {
    regions: Region[]
    onSelectedCity: (city: City) => void
  },
) {
  const { regions, onSelectedCity, ...rest } = props
  const [results, setResults] = useState<Fuse.FuseResult<City>[]>([])
  const SearchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (SearchInputRef.current == null) return
    if (SessionCache.lastSelectedCity == null) return

    SearchInputRef.current.value = SessionCache.lastSelectedCity.city
      .replace('Kota ', '')
      .replace('Kab. ', '')

    SearchInputRef.current.focus()
  }, [SearchInputRef])

  return (
    <Box {...rest}>
      <SearchInput
        regions={regions}
        ref={SearchInputRef}
        onSearchResults={setResults}
      />
      <SearchResultList
        fuseResult={results}
        onClickResult={(result) => onSelectedCity(result.item)}
        InputElement={SearchInputRef}
        position="absolute"
        top={10}
        pt={3}
        hidden={true}
      />
    </Box>
  )
}
