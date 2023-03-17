import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import App from "./App.js";
import "./index.css.proxy.js";
import {HashRouter, Routes, Route} from "../_snowpack/pkg/react-router-dom.js";
import HomePage from "./pages/Home.js";
import LocationPage from "./pages/Location.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(HashRouter, null, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
  path: "/",
  element: /* @__PURE__ */ React.createElement(App, null)
}, /* @__PURE__ */ React.createElement(Route, {
  index: true,
  element: /* @__PURE__ */ React.createElement(HomePage, null)
}), /* @__PURE__ */ React.createElement(Route, {
  path: ":province/:city/*",
  element: /* @__PURE__ */ React.createElement(LocationPage, null)
}))))), document.getElementById("root"));
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
}
