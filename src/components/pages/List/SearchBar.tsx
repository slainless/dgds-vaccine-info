import { Container, VStack } from '@chakra-ui/react'
import { useDataContext } from 'Components/DataContext'
import SearchCityInput from 'Components/SearchCityInput'
import useHasFocusWithin from 'Functions/useHasFocusWithin'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import type { CityValue, ProvinceValue } from 'types/api'

export default function ListSearchBar() {
  const inputRef = useRef<HTMLDivElement>(null)
  const { hasFocus } = useHasFocusWithin(inputRef)
  return (
    <VStack
      justifyContent="center"
      spacing={0}
      gridGap={8}
      textAlign="center"
      pt={5}
      position="sticky"
      top={0}
      backdropFilter="auto"
      backdropBlur="lg"
      zIndex="dropdown"
      // boxShadow="sm"
      width="100%"
    >
      <Container
        as={VStack}
        layerStyle="constraint-sm"
        borderBottom="1px solid"
        borderBottomColor="gray.100"
        pb={3}
      >
        <SearchCityInput width="90%" ref={inputRef} />
      </Container>
    </VStack>
  )
}
