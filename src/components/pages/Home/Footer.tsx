import {
  Text,
  Container,
  VStack,
  useTheme,
  Heading,
  ListItem,
  List,
  Image,
  Box,
  Flex,
  Grid,
} from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'

export default function HomeFooter() {
  const theme = useTheme()
  return (
    <Container
      layerStyle="constraint-sm"
      // bgColor="gray.100"
      // border="2px solid"
      // borderColor="green.100"
      mt={12}
      borderTopRadius="2xl"
      minH={24}
      // bgColor="green.50"
      py={5}
      px={5}
    >
      <VStack spacing={0} gridGap={5}>
        {/* <Heading size="md">Informasi diperoleh dari:</Heading> */}
        <Flex
          textAlign="center"
          // bgColor="green.100"
          position="relative"
          width="full"
          zIndex="base"
          justifyContent="center"
          color="green.500"
          sx={
            {
              // '&::before': {
              //   content: "''",
              //   width: '100%',
              //   position: 'absolute',
              //   top: '50%',
              //   transform: 'translateY(-50%)',
              //   zIndex: 'hide',
              //   display: 'block',
              //   border: '1px solid',
              //   borderColor: 'green.200',
              // },
            }
          }
        >
          <Heading
            zIndex="base"
            bgColor="white"
            size="xs"
            width="max-content"
            textTransform="uppercase"
            fontWeight="semibold"
            letterSpacing="0.05em"
            px={5}
          >
            Sumber Informasi
          </Heading>
        </Flex>
        <Text>
          Sumber informasi dan data lokasi vaksin pada situs ini didapatkan dari
          beberapa sumber:
        </Text>
        <Grid
          gridGap={5}
          templateColumns="repeat(2, 1fr)"
          alignItems="center"
          justifyItems="center"
        >
          <Image src={PUBLIC_URL('assets/indorelawan.svg')} width={[32, 32]} />
          <Image src={PUBLIC_URL('assets/KPCPEN.png')} width={[32, 40]} />
          <Image src={PUBLIC_URL('assets/wbw-logo.svg')} width={[32, 28]} />
          <Image src={PUBLIC_URL('assets/logo-satgas.png')} width={[24, 24]} />
        </Grid>
      </VStack>
    </Container>
  )
}
