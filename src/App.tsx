import { ChakraProvider } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import './App.css'

import Theme from './themes/index'

interface AppProps {}

function App({}: AppProps) {
  return (
    <ChakraProvider theme={Theme}>
      <Outlet />
    </ChakraProvider>
  )
}

export default App
