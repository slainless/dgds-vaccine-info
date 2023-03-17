import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../_snowpack/pkg/react.js";
import {Flex} from "../../_snowpack/pkg/@chakra-ui/react.js";
export default function Carousel(props) {
  return /* @__PURE__ */ React.createElement(Flex, {
    ...props
  });
}
