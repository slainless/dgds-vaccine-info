import type { LocationDetail, VidDetail } from 'types/data'
import { Container, Heading, VStack, Text } from '@chakra-ui/react'
import { useCityParam } from 'Functions/useValidParams'
import DataDisplay from './DataDisplay'

export default function TheLocation(props: { data: LocationDetail | null }) {
  const { data: _, ...rest } = props
  // FIXME: need to check if detail is vaksinasi.id or kipi.covid.19.go.id
  const data = props.data as VidDetail | null
  const city = useCityParam()
  return (
    <Container layerStyle="constraint-sm">
      <Heading size="md" as="h1" ml={5}>
        {data?.title}
      </Heading>
      <Text ml={5}>{city ? `${city.province}, ${city.city}` : null}</Text>
      <VStack
        alignItems="stretch"
        bgColor="white"
        boxShadow="sm"
        borderRadius="lg"
        my={5}
        spacing={0}
        border="1px solid"
        borderColor="gray.100"
      >
        {data == null
          ? null
          : Object.entries(data)?.map(([key, value]) => (
              <DataDisplay
                key={key}
                value={value}
                k={key as keyof LocationDetail}
                location={data}
              />
            ))}
      </VStack>
    </Container>
  )
}
