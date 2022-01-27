import { Box, ChakraProvider, Flex, Portal } from '@chakra-ui/react'
import LayoutFooter from 'Components/layouts/Footer'
import { LoadingProvider } from 'Components/LoadingContext'
import ProgressBar from 'Components/ProgressBar'
import { StoreProvider } from 'Components/StoreContext'
import { useFetchRegions } from 'Functions/useFetchRegions'
import Fuse from 'fuse.js'
import { useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router'
import Bootstrap from './Startup'
import StoreInit from './Store'

import Theme from './themes/index'

interface AppProps {}

function App({}: AppProps) {
  const loading = useState(true)
  const progress = useState<any>({})

  return (
    <ChakraProvider theme={Theme}>
      <LoadingProvider value={{ loading, progress }}>
        <StoreInit>
          <Bootstrap>
            <Outlet />
            <LayoutFooter />
            <Portal>
              <ProgressBar />
            </Portal>
          </Bootstrap>
        </StoreInit>
      </LoadingProvider>
    </ChakraProvider>
  )
}

export default App
