import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../_snowpack/pkg/react.js";
import {Container, Icon, Link} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {Link as RouterLink} from "../../_snowpack/pkg/react-router-dom.js";
import TheDetail from "../components/pages/Detail/TheDetail.js";
import {RiArrowRightLine} from "../../_snowpack/pkg/react-icons/ri.js";
import {useEffect} from "../../_snowpack/pkg/react.js";
import Redirect404 from "../components/Redirect404.js";
export default function DetailPage(props) {
  const {data} = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  console.log(data);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Container, {
    layerStyle: "constraint-sm",
    py: 3
  }, /* @__PURE__ */ React.createElement(Link, {
    as: RouterLink,
    alignItems: "center",
    ml: "auto",
    p: 0,
    display: "flex",
    gridGap: 2,
    width: "max-content",
    opacity: 0.8,
    to: "../"
  }, "Kembali", /* @__PURE__ */ React.createElement(Icon, {
    as: RiArrowRightLine
  }))), data === false ? /* @__PURE__ */ React.createElement(Redirect404, null) : /* @__PURE__ */ React.createElement(TheDetail, {
    data
  }));
}
