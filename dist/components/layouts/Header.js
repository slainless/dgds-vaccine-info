import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../_snowpack/pkg/react.js";
import {Container, HStack, Text, Box} from "../../../_snowpack/pkg/@chakra-ui/react.js";
export default function LayoutHeader() {
  return /* @__PURE__ */ React.createElement(Box, {
    width: "full",
    bgColor: "green.300"
  }, /* @__PURE__ */ React.createElement(Container, {
    maxW: "container.sm",
    px: 2
  }, /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Text, null, "test"))));
}
