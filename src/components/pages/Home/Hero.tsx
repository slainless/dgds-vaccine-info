import {
  Container,
  VStack,
  Text,
  Heading,
  List,
  ListIcon,
  ListItem,
  Box,
  Image,
  Tooltip,
} from '@chakra-ui/react'
import SearchCityInput from 'Components/SearchCityInput'
import useFlipMove from 'Functions/useFlipMove'
import useHasFocusWithin from 'Functions/useHasFocusWithin'
import { useEffect, useRef, useState } from 'react'
import { RiCheckboxCircleFill, RiEditCircleFill } from 'react-icons/ri'

export default function HomeHero(props: Parameters<typeof Container>[0]) {
  const inputRef = useRef<HTMLDivElement>(null)
  const flipMoveRef = useRef<HTMLDivElement>(null)
  const [hasFocus, setFocus] = useState(false)
  // const { updatePosition } = useFlipMove(flipMoveRef, { applyOnChildren: true })

  useEffect(() => {
    if (hasFocus) scrollTo({ top: 0 })
    // console.log('focus changed!')
    // updatePosition()
  }, [hasFocus])

  return (
    <Container
      as={VStack}
      layerStyle="constraint-sm"
      justifyContent="center"
      spacing={0}
      gridGap={8}
      textAlign="center"
      py={5}
      ref={flipMoveRef}
      {...props}
    >
      <Box
        width={80}
        // order={hasFocus ? 2 : 1}
        // mt={10}
      >
        <Image src={PUBLIC_URL('assets/5063408.svg')} />
      </Box>
      <SearchCityInput
        // order={hasFocus ? 1 : 3}
        width="90%"
        ref={inputRef}
        onFocusWithin={(state) => {
          setFocus((oldState) => {
            // updatePosition()
            return state
          })
        }}
      />
      <Heading
        size="lg"
        // order={hasFocus ? 3 : 2}
      >
        Dapatkan informasi{' '}
        <Heading as="span" size="lg" color="green.400">
          lokasi vaksin
        </Heading>{' '}
        Covid-19 terdekat!
      </Heading>
      <Box order={4} fontSize="md">
        <Text
        // maxW={['42ch', 'initial']}
        >
          Kamu juga bisa menemukan informasi lainnya seputar Covid-19:
        </Text>

        <List
          display="flex"
          gridGap={[0, 3]}
          fontWeight="semibold"
          justifyContent="center"
          flexDirection={['column', 'row']}
          pt={[3]}
        >
          <ListItem>
            <ListIcon as={RiCheckboxCircleFill} color="green.500" />
            Lokasi Vaksin
          </ListItem>
          <Tooltip label="Work in Progress" placement="top">
            <ListItem color="red.500" opacity={0.5}>
              <ListIcon as={RiEditCircleFill} />
              Informasi
            </ListItem>
          </Tooltip>
          <Tooltip label="Work in Progress" placement="top">
            <ListItem color="red.500" opacity={0.5}>
              <ListIcon as={RiEditCircleFill} />
              Status & Statistik
            </ListItem>
          </Tooltip>
        </List>
      </Box>
    </Container>
  )
}
