import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {Container, Icon, Link} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import {RiArrowLeftLine} from "../../../../_snowpack/pkg/react-icons/ri.js";
import {Link as RouterLink} from "../../../../_snowpack/pkg/react-router-dom.js";
export default function LocationBackButton(props) {
  const {...rest} = props;
  return /* @__PURE__ */ React.createElement(Container, {
    ...rest
  }, /* @__PURE__ */ React.createElement(Link, {
    as: RouterLink,
    to: "..",
    layerStyle: "constraint-sm",
    alignItems: "center",
    p: 0,
    display: "flex",
    gridGap: 2,
    width: "max-content",
    opacity: 0.8
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: RiArrowLeftLine
  }), "Kembali"));
}
