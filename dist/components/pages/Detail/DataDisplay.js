import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Text
} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import regMethodNormalizer from "../../../functions/regMethodNormalizer.js";
import {DateTime} from "../../../../_snowpack/pkg/luxon.js";
import {MdAccessTimeFilled, MdEventAvailable} from "../../../../_snowpack/pkg/react-icons/md.js";
import {RiExternalLinkFill, RiTeamFill} from "../../../../_snowpack/pkg/react-icons/ri.js";
const Wrapper = (props) => /* @__PURE__ */ React.createElement(Flex, {
  flexDir: "column",
  py: 3,
  px: 6,
  sx: {
    "&": {
      borderBottom: "1px solid",
      borderBottomColor: "gray.100"
    }
  },
  alignItems: "flex-start",
  ...props
});
const Title = (props) => /* @__PURE__ */ React.createElement(Heading, {
  size: "sm",
  fontWeight: "bold",
  mb: 3,
  ...props
});
export default function DataDisplay(props) {
  const {value, k, location} = props;
  switch (k) {
    case "timestart":
      return /* @__PURE__ */ React.createElement(Wrapper, {
        order: 11,
        flexDir: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }, /* @__PURE__ */ React.createElement(Title, {
        mb: 0
      }, "Jam Buka"), /* @__PURE__ */ React.createElement(Flex, {
        alignItems: "center",
        gridGap: 2
      }, /* @__PURE__ */ React.createElement(Icon, {
        as: MdAccessTimeFilled,
        boxSize: 4,
        color: "blue.500",
        order: 2
      }), /* @__PURE__ */ React.createElement(Text, {
        fontSize: "sm",
        fontFamily: "heading",
        fontWeight: "semibold",
        order: 1
      }, location.timestart.substring(0, 5), " -", " ", location.timeend.substring(0, 5))));
    case "datestart":
      return /* @__PURE__ */ React.createElement(Wrapper, {
        order: 12
      }, /* @__PURE__ */ React.createElement(Title, null, "Periode Vaksinasi"), /* @__PURE__ */ React.createElement(Flex, {
        alignItems: "center",
        gridGap: 2,
        width: "100%"
      }, /* @__PURE__ */ React.createElement(Icon, {
        as: MdEventAvailable,
        boxSize: 4,
        color: "red.500",
        order: 1
      }), /* @__PURE__ */ React.createElement(Text, {
        order: 2
      }, DateTime.fromSQL(location.datestart).toLocaleString(DateTime.DATE_MED), " ", "-", " ", DateTime.fromSQL(location.dateend).toLocaleString(DateTime.DATE_MED))));
    case "description":
      return /* @__PURE__ */ React.createElement(Wrapper, {
        order: 10
      }, /* @__PURE__ */ React.createElement(Title, null, "Deskripsi"), typeof value == "string" ? value.split("\n").map((v, i) => /* @__PURE__ */ React.createElement(Text, {
        key: i
      }, v)) : null);
    case "address":
      return /* @__PURE__ */ React.createElement(Wrapper, {
        order: 20
      }, /* @__PURE__ */ React.createElement(Title, null, "Alamat"), /* @__PURE__ */ React.createElement(Text, null, value), /* @__PURE__ */ React.createElement(HStack, {
        pt: 1
      }, /* @__PURE__ */ React.createElement(Icon, {
        as: RiExternalLinkFill,
        color: "gray.500",
        boxSize: 4
      }), /* @__PURE__ */ React.createElement(Link, {
        fontSize: "sm",
        href: location.map,
        target: "_blank",
        variant: "highlight",
        fontFamily: "heading"
      }, "Buka di Google Map")));
    case "registration":
      if (typeof value != "string")
        return null;
      const {display, icon, color} = regMethodNormalizer(value, true);
      return /* @__PURE__ */ React.createElement(Wrapper, {
        order: 30
      }, /* @__PURE__ */ React.createElement(Title, null, "Registrasi"), /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Icon, {
        as: icon,
        color: "gray.500",
        boxSize: 4
      }), /* @__PURE__ */ React.createElement(Text, null, display)));
    case "agerange":
      return /* @__PURE__ */ React.createElement(Wrapper, {
        order: 40
      }, /* @__PURE__ */ React.createElement(Title, null, "Rentang Umur"), /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Icon, {
        as: RiTeamFill,
        color: "gray.500",
        boxSize: 4
      }), /* @__PURE__ */ React.createElement("div", null, Array.isArray(value) ? value.map((v, i) => /* @__PURE__ */ React.createElement(Text, {
        key: i
      }, v)) : null)));
    case "link":
      if (typeof value != "string")
        return null;
      let urlDisplay;
      try {
        urlDisplay = new URL(value).hostname;
      } catch (e) {
        urlDisplay = value;
      }
      return /* @__PURE__ */ React.createElement(Wrapper, {
        order: 13
      }, /* @__PURE__ */ React.createElement(Title, null, "Tautan"), /* @__PURE__ */ React.createElement(HStack, null, /* @__PURE__ */ React.createElement(Icon, {
        as: RiExternalLinkFill,
        color: "gray.500",
        boxSize: 4
      }), /* @__PURE__ */ React.createElement(Link, {
        fontSize: "sm",
        href: value === urlDisplay ? void 0 : value,
        target: "_blank",
        variant: "highlight",
        fontFamily: "heading"
      }, urlDisplay)));
    default:
      return null;
  }
}
