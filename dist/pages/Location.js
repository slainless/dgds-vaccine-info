import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../_snowpack/pkg/react.js";
import useFetchLocations from "../functions/useFetchLocations.js";
import {useCityParam} from "../functions/useParam.js";
import {useEffect, useMemo, useState} from "../../_snowpack/pkg/react.js";
import {Routes, Route, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import hash from "../../_snowpack/pkg/object-hash.js";
import useSetRootBg from "../functions/useSetRootBg.js";
import useSetInitialSearch from "../functions/useSetInitialSearch.js";
import ListPage from "./List.js";
import DetailPage from "./Detail.js";
import Redirect404 from "../components/Redirect404.js";
export default function LocationPage() {
  const city = useCityParam();
  const {locations, fetch} = useFetchLocations(city ? city : null);
  useEffect(() => {
    if (city == null)
      return;
    fetch();
  }, [city]);
  const data = useMemo(() => {
    if (locations == null)
      return null;
    const hashMap = new Map(locations.map((v) => [hash(v), v]));
    return hashMap;
  }, [locations]);
  useSetRootBg("gray.50");
  useSetInitialSearch();
  useEffect(() => {
    if (city === null)
      return;
    if (city === false)
      window.location.replace("/404.html");
  }, [city]);
  const locationHash = useParams()["*"];
  const scrollState = useState([0, 0]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ListPage, {
    hidden: !!locationHash,
    data: data ? Array.from(data.values()) : null,
    scrollState
  }), /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/"
  }, /* @__PURE__ */ React.createElement(Route, {
    index: true,
    element: /* @__PURE__ */ React.createElement(React.Fragment, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: ":locationHash",
    element: /* @__PURE__ */ React.createElement(DetailPage, {
      data: data ? data.get(locationHash) ?? false : null
    })
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "*",
    element: /* @__PURE__ */ React.createElement(Redirect404, null)
  }))));
}
