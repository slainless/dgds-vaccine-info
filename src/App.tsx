import { ChakraProvider, Flex, Portal } from '@chakra-ui/react'
import { DataProvider } from 'Components/DataContext'
import LayoutFooter from 'Components/layouts/Footer'
import { LoadingProvider } from 'Components/LoadingContext'
import ProgressBar from 'Components/ProgressBar'
import { StoreProvider } from 'Components/StoreContext'
import { useFetchRegions } from 'Functions/useFetchRegions'
import { useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router'
import Startup from './Startup'

import Theme from './themes/index'

interface AppProps {}

function App({}: AppProps) {
  const loading = useState(true)
  const progress = useState<any>({})

  const lastLocationCache = useState<any>(null)
  const detailCache = useState<any>({})
  const lastScroll = useState<any>({})
  const locationsState = useState<any>(null)

  return (
    <ChakraProvider theme={Theme}>
      <LoadingProvider value={{ loading, progress }}>
        <StoreProvider
          value={{
            lastLocationCache,
            detailCache,
            lastScroll,
            locations: locationsState,
          }}
        >
          <Startup>
            <Flex flexDirection="column" minH="100%" spacing={0}>
              <Outlet />
            </Flex>
            <LayoutFooter />
            <Portal>
              <ProgressBar />
            </Portal>
          </Startup>
        </StoreProvider>
      </LoadingProvider>
    </ChakraProvider>
  )
}

export default App
