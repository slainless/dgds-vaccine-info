import type { ChakraTheme, ComponentStyleConfig } from '@chakra-ui/theme'

const LinkStyle: ComponentStyleConfig = {
  variants: {
    highlight: {
      bgColor: 'green.200',
      color: 'green.700',
      fontWeight: 'medium',
      px: 1,
    },
  },
}

export default LinkStyle
