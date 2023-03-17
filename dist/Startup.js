import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../_snowpack/pkg/react.js";
import {useFetchRegions} from "./functions/useFetchRegions.js";
import {useEffect} from "../_snowpack/pkg/react.js";
import {useStoreContext} from "./components/StoreContext.js";
import Fuse from "../_snowpack/pkg/fusejs.js";
import Indonesia from "./functions/Indonesia.js";
export default function Bootstrap({children}) {
  const {startFetch, regions} = useFetchRegions();
  const {
    searchFuse: [, setSearchFuse],
    regions: [indonesia, setRegions]
  } = useStoreContext();
  useEffect(() => {
    startFetch();
  }, []);
  useEffect(() => {
    if (regions == null)
      return;
    setRegions(new Indonesia(regions));
  }, [regions]);
  useEffect(() => {
    if (indonesia == null)
      return;
    setSearchFuse(new Fuse(indonesia.cities, {keys: ["city"]}));
  }, [indonesia]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
}
