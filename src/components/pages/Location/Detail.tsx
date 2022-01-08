import type { Locations } from 'types/api'
import { Container, Heading, VStack, Text } from '@chakra-ui/react'
import { useCityParam } from 'Functions/useValidParams'
import DataDisplay from './DataDisplay'

export default function LocationDetail(props: { data: Locations | null }) {
  const { data, ...rest } = props
  const city = useCityParam()
  return (
    <Container layerStyle="constraint-sm">
      <Heading size="md" as="h1" ml={5}>
        {data?.title}
      </Heading>
      <Text ml={5}>
        {city?.province}, {city?.city}
      </Text>
      <VStack
        alignItems="stretch"
        bgColor="white"
        boxShadow="sm"
        borderRadius="lg"
        my={5}
        spacing={0}
        wordBreak="break-word"
      >
        {data == null
          ? null
          : Object.entries(data)?.map(([key, value]) => (
              <DataDisplay
                key={key}
                value={value}
                k={key as keyof Locations}
                location={data}
              />
            ))}
      </VStack>
    </Container>
  )
}
