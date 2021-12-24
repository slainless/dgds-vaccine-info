import {
  Container,
  VStack,
  Text,
  Input,
  Heading,
  List,
  ListIcon,
  ListItem,
  Box,
  Image,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import useFlipMove from 'Functions/useFlipMove'
import useHasFocus from 'Functions/useHasFocus'
import { useEffect, useRef } from 'react'
import {
  RiCheckboxCircleFill,
  RiGroup2Line,
  RiSearchLine,
} from 'react-icons/ri'

export default function HomeHero() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { hasFocus } = useHasFocus(inputRef)
  const { targetRef } = useFlipMove(hasFocus, { applyOnChildren: true })

  useEffect(() => {
    if (hasFocus) scrollTo({ top: 0 })
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
      ref={targetRef}
    >
      <Box width={80} order={hasFocus ? 2 : 1} mt={10}>
        <Image src={PUBLIC_URL('assets/5063408.svg')} />
      </Box>
      <VStack
        alignItems="flex-start"
        spacing={0.5}
        order={hasFocus ? 1 : 3}
        width="90%"
      >
        {/* <Text opacity={0.8} fontSize="xs" as="span">
            Powered by{' '}
            <Text fontSize="inherit" as="span" color="green.500">
              DIGIDES
            </Text>
          </Text> */}
        <InputGroup>
          <InputRightElement>
            <IconButton
              bgColor="transparent"
              boxSize={8}
              minW="initial"
              icon={<Icon as={RiSearchLine} boxSize={5} />}
              aria-label="search-location"
            ></IconButton>
          </InputRightElement>
          <Input
            placeholder="Masukkan kota/kabupaten-mu disini"
            bgColor="white"
            shadow="md"
            ref={inputRef}
          />
        </InputGroup>
      </VStack>
      <Heading size="lg" order={hasFocus ? 3 : 2}>
        Dapatkan informasi{' '}
        <Heading as="span" size="lg" color="green.400">
          lokasi vaksin
        </Heading>{' '}
        Covid-19 terdekat!
      </Heading>
      <Box order={4} fontSize="md">
        <Text>
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
            Informasi Umum
          </ListItem>
          <ListItem>
            <ListIcon as={RiCheckboxCircleFill} color="green.500" />
            Vaksin
          </ListItem>
          <ListItem>
            <ListIcon as={RiCheckboxCircleFill} color="green.500" />
            Status Covid-19
          </ListItem>
        </List>
      </Box>
    </Container>
  )
}
