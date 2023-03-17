import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../_snowpack/pkg/react.js";
import {ChakraProvider, Text, VStack} from "../_snowpack/pkg/@chakra-ui/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import "./index.css.proxy.js";
import themes from "./themes/index.js";
function App() {
  return /* @__PURE__ */ React.createElement(VStack, {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    spacing: 0,
    fontWeight: "bold",
    fontFamily: "heading"
  }, /* @__PURE__ */ React.createElement(Text, {
    fontSize: 28
  }, "Tidak Ditemukan!"), /* @__PURE__ */ React.createElement(Text, {
    fontSize: 128,
    lineHeight: "1em"
  }, "404"));
}
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(ChakraProvider, {
  theme: themes
}, /* @__PURE__ */ React.createElement(App, null))), document.getElementById("root"));
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
