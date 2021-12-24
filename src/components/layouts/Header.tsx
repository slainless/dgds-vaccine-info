import { Container, HStack, Text, Box } from '@chakra-ui/react'

export default function LayoutHeader() {
  return (
    <Box width="full" bgColor="green.300">
      <Container maxW="container.sm" px={2}>
        <HStack>
          <Text>test</Text>
        </HStack>
      </Container>
    </Box>
  )
}
