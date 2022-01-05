import {
  Box,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { useDataContext } from 'Components/DataContext'
import { useLoadingContext } from 'Components/LoadingContext'
import useFuzzySearch from 'Functions/useFuzzySearch'
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { RiCloseLine, RiSearchLine } from 'react-icons/ri'
import type { City } from 'types/api'
import CityDropdown from './Dropdown'
import Fuse from 'fuse.js'
import useHasFocusWithin from 'Functions/useHasFocusWithin'
import mergeRefs from 'react-merge-refs'
import { useLocation, useMatch } from 'react-router-dom'
import * as s from 'superstruct'
import { urlToValue } from 'Functions/regionValueNormalizer'
import { useCityParam } from 'Functions/useValidParams'

type Props = Parameters<typeof VStack>[0] & {
  onFocusWithin?: (state: boolean) => void
}
const SearchCityInput = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { onFocusWithin, ...rest } = props
  const { regions } = useDataContext()
  const { isLoading } = useLoadingContext()
  const cities: City[] | null = useMemo(() => {
    if (regions == null) return null
    return regions
      .map((region) =>
        region.city.map((city) => ({ city, province: region.province })),
      )
      .flat()
  }, [regions])
  const { search, results } = useFuzzySearch(cities, {
    keys: ['city'],
  })
  const dropdownData = useMemo(() => {
    return results.map((result) => result.item).slice(0, 5)
  }, [results])

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { hasFocus, setFocus } = useHasFocusWithin(containerRef)

  // const match = useMatch(':province/:city')
  const param = useCityParam()
  const location = useLocation()

  useEffect(() => {
    if (inputRef.current == null || param == null) return

    inputRef.current.value = param.city
    search(param.city)
  }, [param])

  useEffect(() => {
    if (onFocusWithin) onFocusWithin(hasFocus)
  }, [hasFocus])

  return (
    <VStack
      alignItems="flex-start"
      spacing={0.5}
      position="relative"
      ref={mergeRefs([ref ?? (() => {}), containerRef])}
      zIndex="docked"
      {...rest}
    >
      <InputGroup>
        <InputRightElement
          // w={hasFocus ? 20 : 10}
          w={10}
        >
          <IconButton
            variant="ghost"
            boxSize={7}
            minW="initial"
            icon={<Icon as={RiCloseLine} boxSize={5} />}
            aria-label="search-location"
            hidden={hasFocus === false || isLoading}
            onClick={() => {
              if (inputRef.current == null) return
              inputRef.current.value = ''
              search('')
              inputRef.current.focus()
            }}
          />
          {/* <Box
            height="80%"
            border="1px solid"
            borderColor="gray.200"
            mx={1}
            hidden={hasFocus === false}
          /> */}
          <IconButton
            variant="ghost"
            boxSize={7}
            minW="initial"
            icon={<Icon as={RiSearchLine} boxSize={5} />}
            aria-label="search-location"
            hidden={hasFocus || isLoading}
            disabled
            pointerEvents="none"
          />
          <Spinner
            boxSize={5}
            thickness="3px"
            color="gray.300"
            hidden={isLoading === false}
          />
        </InputRightElement>
        <Input
          placeholder={
            isLoading && regions == null
              ? `Sedang mengunduh daftar kota...`
              : `Masukkan kota/kabupaten-mu disini`
          }
          bgColor="white"
          shadow="md"
          // pr={hasFocus ? 20 : 10}
          pr={10}
          ref={inputRef}
          onInput={(e) => {
            search(inputRef.current!.value)
          }}
          disabled={isLoading}
        />
      </InputGroup>
      <CityDropdown
        data={dropdownData}
        hidden={dropdownData.length === 0 || hasFocus == false}
        onClickItem={(city, e) => {
          console.log('clicked', city)
          if (inputRef.current == null) return
          inputRef.current.value = city.city
          setFocus(false)
          document.body.focus()
        }}
      />
    </VStack>
  )
})

export default SearchCityInput
