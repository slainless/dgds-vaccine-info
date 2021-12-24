import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import type Fuse from 'fuse.js'
import type { Cities } from 'types/api'
import { Box, Button, HStack, Link, Text } from '@chakra-ui/react'

type Props = Parameters<typeof Box>[0] & {
  fuseResult: Fuse.FuseResult<Cities>[]
  onClickResult: (result: Fuse.FuseResult<Cities>) => void
  InputElement: React.RefObject<HTMLInputElement>
}

const SearchResultList = /*forwardRef<HTMLDivElement, Props>(*/ (
  props: Props,
) => {
  const { fuseResult, onClickResult, InputElement, ...rest } = props
  const [isFocused, setFocused] = useState(
    document.activeElement === InputElement.current,
  )
  const RegionList = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (InputElement.current == null) return
    const input = InputElement.current

    input.addEventListener('focusin', (e) => setFocused(true))
    input.addEventListener('focusout', (e) => setFocused(false))
  }, [InputElement])

  useEffect(() => {
    if (RegionList.current == null) return
    if (isFocused) RegionList.current.hidden = false
  }, [isFocused])

  document.onclick = (e: MouseEvent) => {
    if (isFocused) return
    if (RegionList.current == null) return
    if (RegionList.current.hidden) return

    if (e.composedPath().includes(RegionList.current) === false)
      RegionList.current.hidden = true
  }

  return (
    <HStack
      {...rest}
      ref={RegionList}
      border="1px solid"
      borderColor="gray.300"
      width="100%"
      borderRadius="md"
      bgColor="white"
      flexWrap="wrap"
      spacing={0}
      overflow="hidden"
      boxShadow="lg"
    >
      {fuseResult.slice(0, 5).map((result) => {
        return (
          <Link
            key={result.refIndex}
            tabIndex={0}
            bgColor="white"
            borderRadius="none"
            borderBottom="1px solid"
            borderBottomColor="gray.300"
            width="100%"
            sx={{
              '&:last-of-type': { borderBottom: 'none' },
            }}
            onClick={() => {
              onClickResult(result)
              RegionList.current!.hidden = true
              InputElement.current!.value = result.item.city
                .replace('Kota ', '')
                .replace('Kab. ', '')
            }}
            py={1}
            pl={3}
          >
            <Text
              children={result.item.city.trim()}
              fontSize="sm"
              fontWeight="medium"
            />
            <Text children={result.item.province} fontSize="xs" />
          </Link>
        )
      })}
    </HStack>
  )
}

export default SearchResultList
