import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../_snowpack/pkg/react.js";
import {Box} from "../../_snowpack/pkg/@chakra-ui/react.js";
import TheList from "../components/pages/List/TheList.js";
import ListSearchBar from "../components/pages/List/SearchBar.js";
import {useEffect} from "../../_snowpack/pkg/react.js";
export default function ListPage(props) {
  const {data, scrollState, ...rest} = props;
  const [lastState, setLastState] = scrollState;
  useEffect(() => {
    window.scrollTo(...lastState);
  });
  return /* @__PURE__ */ React.createElement(Box, {
    ...rest
  }, /* @__PURE__ */ React.createElement(ListSearchBar, null), /* @__PURE__ */ React.createElement(TheList, {
    data,
    onClick: () => setLastState([window.scrollX, window.scrollY])
  }));
}
