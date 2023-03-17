import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {
  Text,
  Container,
  VStack,
  useTheme,
  Heading,
  Image,
  Flex,
  Grid
} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
export default function HomeFooter() {
  const theme = useTheme();
  return /* @__PURE__ */ React.createElement(Container, {
    layerStyle: "constraint-sm",
    mt: 12,
    borderTopRadius: "2xl",
    minH: 24,
    py: 5,
    px: 5
  }, /* @__PURE__ */ React.createElement(VStack, {
    spacing: 0,
    gridGap: 5
  }, /* @__PURE__ */ React.createElement(Flex, {
    textAlign: "center",
    position: "relative",
    width: "full",
    zIndex: "base",
    justifyContent: "center",
    color: "green.500",
    sx: {}
  }, /* @__PURE__ */ React.createElement(Heading, {
    zIndex: "base",
    bgColor: "white",
    size: "xs",
    width: "max-content",
    textTransform: "uppercase",
    fontWeight: "semibold",
    letterSpacing: "0.05em",
    px: 5
  }, "Sumber Informasi")), /* @__PURE__ */ React.createElement(Text, null, "Sumber informasi dan data lokasi vaksin pada situs ini didapatkan dari beberapa sumber:"), /* @__PURE__ */ React.createElement(Grid, {
    gridGap: 5,
    templateColumns: "repeat(2, 1fr)",
    alignItems: "center",
    justifyItems: "center"
  }, /* @__PURE__ */ React.createElement(Image, {
    src: PUBLIC_URL("assets/indorelawan.svg"),
    width: [32, 32]
  }), /* @__PURE__ */ React.createElement(Image, {
    src: PUBLIC_URL("assets/KPCPEN.png"),
    width: [32, 40]
  }), /* @__PURE__ */ React.createElement(Image, {
    src: PUBLIC_URL("assets/wbw-logo.svg"),
    width: [32, 28]
  }), /* @__PURE__ */ React.createElement(Image, {
    src: PUBLIC_URL("assets/logo-satgas.png"),
    width: [24, 24]
  }))));
}
