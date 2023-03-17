import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {
  Container,
  Heading,
  Icon,
  Portal,
  VStack
} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import hash from "../../../../_snowpack/pkg/object-hash.js";
import ListItem from "./Item.js";
import {useLoadingContext} from "../../LoadingContext.js";
import {RiEmotionSadLine} from "../../../../_snowpack/pkg/react-icons/ri.js";
export default function TheList(props) {
  const {data, onClick, ...rest} = props;
  const {isLoading} = useLoadingContext();
  return /* @__PURE__ */ React.createElement(Container, {
    as: VStack,
    layerStyle: "constraint-sm",
    justifyContent: "center",
    spacing: 0,
    gridGap: 3,
    textAlign: "center",
    alignItems: "stretch",
    py: 5,
    pb: 20,
    ...rest
  }, data?.map((location, i) => {
    const locationHash = hash(location);
    return /* @__PURE__ */ React.createElement(ListItem, {
      location,
      key: i,
      to: locationHash,
      onClick
    });
  }), /* @__PURE__ */ React.createElement(Portal, null, /* @__PURE__ */ React.createElement(VStack, {
    hidden: isLoading || data == null || data.length > 0,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0.7,
    spacing: 0,
    gridGap: 4,
    color: "red.500"
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: RiEmotionSadLine,
    boxSize: 24
  }), /* @__PURE__ */ React.createElement(Heading, {
    size: "sm",
    maxW: "20ch",
    textAlign: "center"
  }, "Lokasi vaksin tidak ditemukan."))));
}
