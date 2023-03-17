import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../_snowpack/pkg/react.js";
export default function Redirect404() {
  window.location.replace("/404.html");
  return /* @__PURE__ */ React.createElement(React.Fragment, null);
}
