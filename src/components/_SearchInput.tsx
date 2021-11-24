import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import React, { forwardRef, useEffect, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { FaSearch } from 'react-icons/fa'
import type { Cities, Regions } from 'types/api'
import { SessionCache } from '#/cache'

type Props = {
  regions: Regions[]
  onSearchResults: (results: Fuse.FuseResult<Cities>[]) => void
}
const SearchInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { regions, onSearchResults } = props
  const [fuse, setFuse] = useState<Fuse<Cities>>(new Fuse([]))

  useEffect(() => {
    if (regions.length === 0) return

    const cities: Cities[] = regions
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

  const [results, setResult] = useState<Fuse.FuseResult<Cities>[]>([])

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
        placeholder="Masukkan nama kota/kab."
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
