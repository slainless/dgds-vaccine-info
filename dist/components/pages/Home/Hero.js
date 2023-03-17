import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {
  Container,
  VStack,
  Text,
  Heading,
  List,
  ListIcon,
  ListItem,
  Box,
  Image,
  Tooltip
} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import SearchCityInput from "../../SearchCityInput/index.js";
import {useEffect, useRef, useState} from "../../../../_snowpack/pkg/react.js";
import {RiCheckboxCircleFill, RiEditCircleFill} from "../../../../_snowpack/pkg/react-icons/ri.js";
export default function HomeHero(props) {
  const inputRef = useRef(null);
  const flipMoveRef = useRef(null);
  const [hasFocus, setFocus] = useState(false);
  useEffect(() => {
    if (hasFocus)
      scrollTo({top: 0});
  }, [hasFocus]);
  return /* @__PURE__ */ React.createElement(Container, {
    as: VStack,
    layerStyle: "constraint-sm",
    justifyContent: "center",
    spacing: 0,
    gridGap: 8,
    textAlign: "center",
    py: 5,
    ref: flipMoveRef,
    ...props
  }, /* @__PURE__ */ React.createElement(Box, {
    width: 80
  }, /* @__PURE__ */ React.createElement(Image, {
    src: PUBLIC_URL("assets/5063408.svg")
  })), /* @__PURE__ */ React.createElement(SearchCityInput, {
    width: "90%",
    ref: inputRef,
    onFocusWithin: (state) => {
      setFocus((oldState) => {
        return state;
      });
    }
  }), /* @__PURE__ */ React.createElement(Heading, {
    size: "lg"
  }, "Dapatkan informasi", " ", /* @__PURE__ */ React.createElement(Heading, {
    as: "span",
    size: "lg",
    color: "green.400"
  }, "lokasi vaksin"), " ", "Covid-19 terdekat!"), /* @__PURE__ */ React.createElement(Box, {
    order: 4,
    fontSize: "md"
  }, /* @__PURE__ */ React.createElement(Text, null, "Kamu juga bisa menemukan informasi lainnya seputar Covid-19:"), /* @__PURE__ */ React.createElement(List, {
    display: "flex",
    gridGap: [0, 3],
    fontWeight: "semibold",
    justifyContent: "center",
    flexDirection: ["column", "row"],
    pt: [3]
  }, /* @__PURE__ */ React.createElement(ListItem, null, /* @__PURE__ */ React.createElement(ListIcon, {
    as: RiCheckboxCircleFill,
    color: "green.500"
  }), "Lokasi Vaksin"), /* @__PURE__ */ React.createElement(Tooltip, {
    label: "Work in Progress",
    placement: "top"
  }, /* @__PURE__ */ React.createElement(ListItem, {
    color: "red.500",
    opacity: 0.5
  }, /* @__PURE__ */ React.createElement(ListIcon, {
    as: RiEditCircleFill
  }), "Informasi")), /* @__PURE__ */ React.createElement(Tooltip, {
    label: "Work in Progress",
    placement: "top"
  }, /* @__PURE__ */ React.createElement(ListItem, {
    color: "red.500",
    opacity: 0.5
  }, /* @__PURE__ */ React.createElement(ListIcon, {
    as: RiEditCircleFill
  }), "Status & Statistik")))));
}
