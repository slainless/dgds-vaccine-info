import {
  Container,
  HStack,
  Stack,
  Box,
  Flex,
  Button,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import Carousel from 'framer-motion-carousel'
import type { DotProps } from 'framer-motion-carousel/dist/types/types'
import { createPortal } from 'react-dom'

function Dot(props: DotProps & { target: Element }) {
  const { activeIndex, setActiveIndex, target, length } = props
  return createPortal(
    Array(length)
      .fill(0)
      .map((v, i) => (
        <Button
          minW={0}
          boxSize={3}
          p={0}
          bgColor={activeIndex === i ? 'gray.600' : 'gray.300'}
          boxShadow="sm"
          borderRadius="full"
          onClick={() => setActiveIndex(i)}
        ></Button>
      )),
    target,
  )
}

export default function HomeSlider() {
  const dotsContainer = useRef(document.createElement('div'))
  const SliderElements = [
    <VStack alignItems="flex-start">
      <Heading size="md">
        Jumlah{' '}
        <Text as="span" color="orange.400" fontSize="inherit">
          Positif
        </Text>
      </Heading>
      <Text fontSize={56} lineHeight="1em">
        4,268,890
      </Text>
    </VStack>,
    <VStack alignItems="flex-start">
      <Heading size="md">
        Jumlah{' '}
        <Text as="span" color="green.400" fontSize="inherit">
          Sembuh
        </Text>
      </Heading>
      <Text fontSize={56} lineHeight="1em">
        4,117,347
      </Text>
    </VStack>,
    <VStack alignItems="flex-start">
      <Heading size="md">
        Jumlah{' '}
        <Text as="span" color="red.400" fontSize="inherit">
          Meninggal
        </Text>
      </Heading>
      <Text fontSize={56} lineHeight="1em">
        144,155
      </Text>
    </VStack>,
    <VStack alignItems="flex-start">
      <Heading size="md">
        Jumlah{' '}
        <Text as="span" color="yellow.400" fontSize="inherit">
          Dirawat
        </Text>
      </Heading>
      <Text fontSize={56} lineHeight="1em">
        7,388
      </Text>
    </VStack>,
  ]

  useEffect(() => {
    document.querySelector(`#carousel-dots`)?.appendChild(dotsContainer.current)
    return () => dotsContainer.current.remove()
  })

  return (
    <Container layerStyle="container.sm">
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
          Statistik
        </Heading>
      </Flex>
      <Carousel
        autoPlay={true}
        interval={5000}
        loop={true}
        renderArrowLeft={(args: any) => null}
        renderArrowRight={(args: any) => null}
        renderDots={(args) => (
          <Dot
            target={dotsContainer.current}
            length={SliderElements.length}
            {...args}
          ></Dot>
        )}
      >
        {SliderElements.map((v, i) => (
          <Box key={i} p={5}>
            <Box
              p={5}
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
            >
              {v}
            </Box>
          </Box>
        ))}
      </Carousel>
      <HStack
        id="carousel-dots"
        spacing={0}
        gridGap={2}
        justifyContent="center"
        sx={{
          '& > *': {
            display: 'contents',
          },
        }}
      ></HStack>
    </Container>
  )
}
