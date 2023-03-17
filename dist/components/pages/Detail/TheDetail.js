import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {Container, Heading, VStack, Text} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import {useCityParam} from "../../../functions/useParam.js";
import DataDisplay from "./DataDisplay.js";
export default function TheLocation(props) {
  const {data: _, ...rest} = props;
  const data = props.data;
  const city = useCityParam();
  return /* @__PURE__ */ React.createElement(Container, {
    layerStyle: "constraint-sm",
    pb: 16
  }, /* @__PURE__ */ React.createElement(Heading, {
    size: "md",
    as: "h1",
    ml: 5
  }, data?.isVidDetail() ? data.title : data?.isKipiDetail() ? data.nama : null), /* @__PURE__ */ React.createElement(Text, {
    ml: 5
  }, city ? `${city.province}, ${city.city}` : null), /* @__PURE__ */ React.createElement(VStack, {
    alignItems: "stretch",
    bgColor: "white",
    boxShadow: "sm",
    borderRadius: "lg",
    my: 5,
    spacing: 0,
    border: "1px solid",
    borderColor: "gray.100"
  }, data?.isVidDetail() ? Object.entries(data)?.map(([key, value]) => /* @__PURE__ */ React.createElement(DataDisplay, {
    key,
    value,
    k: key,
    location: data
  })) : null));
}
