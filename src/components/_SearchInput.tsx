import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import { forwardRef, useEffect, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { FaSearch } from 'react-icons/fa'
import type { City, Region } from 'types/api'
import { SessionCache } from '#/cache'

type Props = {
  regions: Region[]
  onSearchResults: (results: Fuse.FuseResult<City>[]) => void
}
const SearchInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { regions, onSearchResults } = props
  const [fuse, setFuse] = useState<Fuse<City>>(new Fuse([]))

  useEffect(() => {
    if (regions.length === 0) return

    const cities: City[] = regions
      .map((region) =>
        region.city.map((city) => ({
          city,
          province: region.province,
        })),
      )
      .flat()

    setFuse(
      new Fuse(cities, {
        keys: ['city'],
      }),
    )
  }, [regions])

  const [results, setResult] = useState<Fuse.FuseResult<City>[]>([])

  function inputHandler(val: string) {
    setResult(fuse.search(val))
  }

  useEffect(() => {
    onSearchResults(results)
  }, [results])

  return (
    <InputGroup zIndex="docked">
      <InputLeftElement>
        <Icon as={FaSearch} color="green.500" />
      </InputLeftElement>
      <Input
        placeholder="Cari kota/kabupaten disini..."
        ref={ref}
        onInput={(e) => {
          const input = e.target as HTMLInputElement
          inputHandler(input.value)
        }}
        onFocus={(e) => {
          const input = e.target as HTMLInputElement
          if (input.value !== '') inputHandler(input.value)
        }}
        bgColor="white"
        fontSize="sm"
        boxShadow="sm"
      />
    </InputGroup>
  )
})

export default SearchInput
