import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../_snowpack/pkg/react.js";
import {StoreProvider} from "./components/StoreContext.js";
import {useState} from "../_snowpack/pkg/react.js";
export default function StoreInit({children}) {
  const lastScroll = useState({});
  const locations = useState(null);
  const regions = useState(null);
  const searchFuse = useState(null);
  const searchInput = useState(null);
  return /* @__PURE__ */ React.createElement(StoreProvider, {
    value: {
      lastScroll,
      locations,
      searchFuse,
      searchInput,
      regions
    }
  }, children);
}
