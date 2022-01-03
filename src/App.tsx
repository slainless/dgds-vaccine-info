import { ChakraProvider, Flex, Portal } from '@chakra-ui/react'
import { DataProvider } from 'Components/DataContext'
import { LoadingProvider } from 'Components/LoadingContext'
import ProgressBar from 'Components/ProgressBar'
import { useFetchRegions } from 'Functions/useFetchRegions'
import { useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router'
import Startup from './Startup'

import Theme from './themes/index'

interface AppProps {}

function App({}: AppProps) {
  const loading = useState(true)
  const progress = useState<Record<string, number>>({})

  return (
    <ChakraProvider theme={Theme}>
      <LoadingProvider value={{ loading, progress }}>
        <Startup>
          <Flex flexDirection="column" minH="100%" spacing={0}>
            <Outlet />
          </Flex>
          <Portal>
            <ProgressBar />
          </Portal>
        </Startup>
      </LoadingProvider>
    </ChakraProvider>
  )
}

export default App
