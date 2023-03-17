import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {Container, VStack} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import SearchCityInput from "../../SearchCityInput/index.js";
export default function ListSearchBar() {
  return /* @__PURE__ */ React.createElement(VStack, {
    justifyContent: "center",
    spacing: 0,
    gridGap: 8,
    textAlign: "center",
    pt: 5,
    position: "sticky",
    top: 0,
    backdropFilter: "auto",
    backdropBlur: "lg",
    zIndex: "dropdown",
    width: "100%"
  }, /* @__PURE__ */ React.createElement(Container, {
    as: VStack,
    layerStyle: "constraint-sm",
    borderBottom: "1px solid",
    borderBottomColor: "gray.100",
    pb: 3
  }, /* @__PURE__ */ React.createElement(SearchCityInput, {
    width: "90%"
  })));
}
