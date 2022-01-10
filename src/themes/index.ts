import { extendTheme, ChakraTheme } from '@chakra-ui/react'

import Styles from './styles'

import Text from './components/Text'
import Link from './components/Link'

const Theme: Partial<ChakraTheme> = {
  components: {
    Text,
    Link,
  },
}

export default extendTheme(Theme, Styles)
