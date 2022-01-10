import { ChakraProvider, Heading, Text, VStack } from '@chakra-ui/react'
import ReactDOM from 'react-dom'
import './index.css'
import themes from './themes'

function App() {
  return (
    <VStack
      height="100%"
      alignItems="center"
      justifyContent="center"
      spacing={0}
      fontWeight="bold"
      fontFamily="heading"
    >
      <Text fontSize={28}>Tidak Ditemukan!</Text>
      <Text fontSize={128} lineHeight="1em">
        404
      </Text>
    </VStack>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={themes}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
