import { extendTheme, ChakraTheme } from '@chakra-ui/react'

import Styles from './styles'

import Text from './components/Text'
import Link from './components/Link'
import Input from './components/Input'

const Theme: Partial<ChakraTheme> = {
  components: {
    Text,
    Link,
    Input,
  },
}

export default extendTheme(Theme, Styles)
