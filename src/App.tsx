import { ChakraProvider, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router'

import Theme from './themes/index'

interface AppProps {}

function App({}: AppProps) {
  return (
    <ChakraProvider theme={Theme}>
      <Flex flexDirection="column" minH="100%" spacing={0}>
        <Outlet />
      </Flex>
    </ChakraProvider>
  )
}

export default App
