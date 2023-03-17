import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {
  Badge,
  Button,
  Flex,
  Text,
  Heading,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  VStack
} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import regMethodNormalizer from "../../../functions/regMethodNormalizer.js";
import {DateTime} from "../../../../_snowpack/pkg/luxon.js";
import {
  MdAccessTimeFilled,
  MdEventAvailable,
  MdLocationOn,
  MdOutlineLocalPhone
} from "../../../../_snowpack/pkg/react-icons/md.js";
import {Link as RouterLink} from "../../../../_snowpack/pkg/react-router-dom.js";
export default function ListItem(props) {
  const {location, to, ...rest} = props;
  const data = location.unified;
  const regInfo = regMethodNormalizer(data.registration);
  return /* @__PURE__ */ React.createElement(LinkBox, {
    display: "flex",
    flexDir: "column",
    boxShadow: "sm",
    border: "1px solid",
    borderColor: "gray.100",
    borderRadius: "md",
    bgColor: "white",
    pt: 4,
    pb: 2,
    px: 5,
    spacing: 0,
    gridGap: 4,
    alignItems: "stretch",
    ...rest
  }, /* @__PURE__ */ React.createElement(Flex, {
    gridGap: 2
  }, /* @__PURE__ */ React.createElement(VStack, {
    className: "info",
    gridGap: 1,
    spacing: 0,
    textAlign: "left",
    alignItems: "flex-start",
    flexGrow: 1
  }, /* @__PURE__ */ React.createElement(Heading, {
    size: "sm",
    letterSpacing: 0.3,
    fontWeight: "bold",
    mb: 2
  }, /* @__PURE__ */ React.createElement(LinkOverlay, {
    as: RouterLink,
    to
  }, data.title)), /* @__PURE__ */ React.createElement(Text, {
    fontSize: "0.825rem",
    color: "gray.500"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdLocationOn,
    mr: 1,
    color: "gray.300",
    boxSize: 4
  }), data.address)), /* @__PURE__ */ React.createElement(VStack, {
    className: "link",
    width: "max-content",
    alignItems: "stretch"
  }, /* @__PURE__ */ React.createElement(Button, {
    size: "xs",
    as: "a",
    href: data.link,
    target: "_blank"
  }, "Tautan"), /* @__PURE__ */ React.createElement(Button, {
    size: "xs",
    as: "a",
    href: data.map,
    target: "_blank"
  }, "Peta"))), /* @__PURE__ */ React.createElement(HStack, {
    borderTop: "1px solid",
    borderTopColor: "gray.100",
    pt: 2,
    fontSize: "sm",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gridGap: 1,
    spacing: 0
  }, /* @__PURE__ */ React.createElement(Flex, {
    opacity: 0.8,
    alignItems: "center"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: regInfo.icon,
    mr: 2,
    color: `${regInfo.color}.300`,
    boxSize: 4
  }), /* @__PURE__ */ React.createElement(Badge, {
    colorScheme: regInfo.color,
    size: "xs",
    fontFamily: "heading",
    letterSpacing: 0.2
  }, regInfo.display)), location.isVidDetail() ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Flex, {
    alignItems: "center",
    opacity: 0.6,
    gridGap: 2
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdAccessTimeFilled,
    boxSize: 4,
    color: "blue.500",
    order: 2
  }), /* @__PURE__ */ React.createElement(Text, {
    fontSize: "xs",
    fontFamily: "heading",
    fontWeight: "semibold",
    order: 1
  }, location.timestart.substring(0, 5), " -", " ", location.timeend.substring(0, 5))), /* @__PURE__ */ React.createElement(Flex, {
    alignItems: "center",
    opacity: 0.6,
    gridGap: 2,
    width: "100%"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdEventAvailable,
    boxSize: 4,
    color: "red.500",
    order: 1
  }), /* @__PURE__ */ React.createElement(Text, {
    fontSize: "xs",
    fontFamily: "heading",
    fontWeight: "semibold",
    order: 2
  }, DateTime.fromSQL(location.datestart).toLocaleString(DateTime.DATE_MED), " ", "-", " ", DateTime.fromSQL(location.dateend).toLocaleString(DateTime.DATE_MED)))) : null, location.isKipiDetail() && location.telp != null ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Flex, {
    alignItems: "center",
    opacity: 0.6,
    gridGap: 2
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: MdOutlineLocalPhone,
    boxSize: 4,
    color: "blue.500",
    order: 2
  }), /* @__PURE__ */ React.createElement(Text, {
    fontSize: "xs",
    fontFamily: "heading",
    fontWeight: "semibold",
    order: 1
  }, location.telp))) : null));
}
