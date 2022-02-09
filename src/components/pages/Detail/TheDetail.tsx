import type { LocationDetail } from 'Functions/Location'
import { Container, Heading, VStack, Text } from '@chakra-ui/react'
import { useCityParam } from 'Functions/useParam'
import DataDisplay from './DataDisplay'
import type { VidDetail } from '#/types/definition'

export default function TheLocation(props: { data: LocationDetail | null }) {
  const { data: _, ...rest } = props
  // FIXME: need to check if detail is vaksinasi.id or kipi.covid.19.go.id
  const data = props.data
  const city = useCityParam()
  return (
    <Container layerStyle="constraint-sm" pb={16}>
      <Heading size="md" as="h1" ml={5}>
        {data?.isVidDetail()
          ? data.title
          : data?.isKipiDetail()
          ? data.nama
          : null}
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
        {data?.isVidDetail()
          ? Object.entries(data)?.map(([key, value]) => (
              <DataDisplay
                key={key}
                value={value}
                k={key as keyof VidDetail}
                location={data}
              />
            ))
          : null}
      </VStack>
    </Container>
  )
}
