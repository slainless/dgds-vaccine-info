import { Heading, Link, VStack, Text } from '@chakra-ui/react'
import { defaults } from 'lodash-es'
import { Link as RouterLink } from 'react-router-dom'
import type { City } from 'types/api'

function DropdownItem(
  props: Parameters<typeof Link>[0] & {
    city: City
  },
) {
  const {
    city: { city, province },
    ...rest
  } = props
  return (
    <Link
      as={RouterLink}
      to={`/${province}/${city}`}
      sx={{
        '&:first-of-type :first-of-type': {
          borderTop: 'none',
        },
      }}
      tabIndex={0}
      {...rest}
    >
      <VStack
        spacing={0}
        alignItems="flex-start"
        // bgColor="red"
        width="full"
        py={1}
        borderTop="1px solid"
        borderTopColor="gray.200"
        pl={4}
      >
        <Heading size="sm">{city}</Heading>
        <Text>{province}</Text>
      </VStack>
    </Link>
  )
}

export default function CityDropdown(
  props: Parameters<typeof VStack>[0] & {
    data: City[]
    onClickItem?: (city: City, e: React.MouseEvent) => void
  },
) {
  const { data, onClickItem, ...rest } = defaults(props, {
    onClickItem: () => {},
  })
  return (
    <VStack
      position="absolute"
      top="100%"
      width="100%"
      zIndex="hide"
      // bgColor="red"
      transform="translateY(-0.5em)"
      border="1px solid"
      borderColor="gray.200"
      borderBottomRadius="md"
      bgColor="white"
      boxShadow="md"
      pt={3}
      alignItems="stretch"
      spacing={0}
      {...rest}
    >
      {data.map((city, i) => (
        <DropdownItem
          city={city}
          key={i}
          onClick={(e) => {
            console.log('fuc', onClickItem)
            onClickItem(city, e)
          }}
        />
      ))}
    </VStack>
  )
}
