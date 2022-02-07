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
import { useLoadingContext } from 'Components/LoadingContext'
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { RiCloseLine, RiSearchLine } from 'react-icons/ri'
import type { UCity } from '#/types/definition'
import CityDropdown from './Dropdown'
import type Fuse from 'fuse.js'
import useHasFocusWithin from 'Functions/useHasFocusWithin'
import mergeRefs from 'react-merge-refs'
import { useStoreContext } from 'Components/StoreContext'
import useIsMobile from 'Functions/useIsMobile'

type Props = Parameters<typeof VStack>[0] & {
  onFocusWithin?: (state: boolean) => void
}
const SearchCityInput = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const isMobile = useIsMobile()
  const { onFocusWithin, ...rest } = props

  const {
    regions: [regions],
  } = useStoreContext()
  const { isLoading } = useLoadingContext()

  const {
    searchFuse: [searchFuse],
    searchInput: [searchInput, setSearchInput],
  } = useStoreContext()
  // const dropdownData = useMemo(() => {
  //   return results.map((result) => result.item).slice(0, 5)
  // }, [results])

  const [dropdownData, setDropdownData] = useState<UCity[]>(
    searchInput?.dropdownData ?? [],
  )
  const search = useCallback(
    (...props: Parameters<Fuse<UCity>['search']>) => {
      if (searchFuse == null) return null
      const result = searchFuse.search(...props)
      setDropdownData(result.slice(0, 5).map((r) => r.item))
      return result
    },
    [searchFuse],
  )
  useEffect(() => {
    if (searchInput != null) setDropdownData(searchInput.dropdownData)
  }, [searchInput])

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { hasFocus, setFocus } = useHasFocusWithin(containerRef)

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
      className={
        hasFocus && isMobile && dropdownData.length !== 0 ? 'is-mobile' : ''
      }
      {...rest}
      sx={{
        '&.is-mobile': {
          position: 'fixed',
          top: 0,
          width: '100%',
        },
      }}
    >
      <InputGroup>
        <InputRightElement
          // w={hasFocus ? 20 : 10}
          w={10}
          alignItems="center"
          justifyContent="center"
          height="100%"
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
          defaultValue={searchInput?.inputValue}
          onInput={(e) => {
            search(inputRef.current!.value)
          }}
          disabled={isLoading}
          sx={{
            '.is-mobile &': {
              borderRadius: 'none',
              py: 6,
            },
          }}
        />
      </InputGroup>
      <CityDropdown
        data={dropdownData}
        hidden={dropdownData.length === 0 || hasFocus == false}
        onClickItem={(city, e) => {
          console.log('clicked', city)
          if (inputRef.current == null) return
          inputRef.current.value = city.city
          setSearchInput({
            inputValue: city.city,
            dropdownData,
          })
          setFocus(false)
          document.body.focus()
        }}
        sx={{
          '.is-mobile &': {
            borderRadius: 'none',
            height: '100vh',
          },
        }}
      />
    </VStack>
  )
})

export default SearchCityInput
