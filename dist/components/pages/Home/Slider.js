import * as __SNOWPACK_ENV__ from '../../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../../_snowpack/pkg/react.js";
import {
  Container,
  HStack,
  Box,
  Flex,
  Button,
  VStack,
  Heading,
  Text
} from "../../../../_snowpack/pkg/@chakra-ui/react.js";
import {useEffect, useRef} from "../../../../_snowpack/pkg/react.js";
import Carousel from "../../../../_snowpack/pkg/framer-motion-carousel.js";
import {createPortal} from "../../../../_snowpack/pkg/react-dom.js";
function Dot(props) {
  const {activeIndex, setActiveIndex, target, length} = props;
  return createPortal(Array(length).fill(0).map((v, i) => /* @__PURE__ */ React.createElement(Button, {
    minW: 0,
    boxSize: 3,
    p: 0,
    bgColor: activeIndex === i ? "gray.600" : "gray.300",
    boxShadow: "sm",
    borderRadius: "full",
    onClick: () => setActiveIndex(i)
  })), target);
}
export default function HomeSlider() {
  const dotsContainer = useRef(document.createElement("div"));
  const SliderElements = [
    /* @__PURE__ */ React.createElement(VStack, {
      alignItems: "flex-start"
    }, /* @__PURE__ */ React.createElement(Heading, {
      size: "md"
    }, "Jumlah", " ", /* @__PURE__ */ React.createElement(Text, {
      as: "span",
      color: "orange.400",
      fontSize: "inherit"
    }, "Positif")), /* @__PURE__ */ React.createElement(Text, {
      fontSize: 56,
      lineHeight: "1em"
    }, "4,268,890")),
    /* @__PURE__ */ React.createElement(VStack, {
      alignItems: "flex-start"
    }, /* @__PURE__ */ React.createElement(Heading, {
      size: "md"
    }, "Jumlah", " ", /* @__PURE__ */ React.createElement(Text, {
      as: "span",
      color: "green.400",
      fontSize: "inherit"
    }, "Sembuh")), /* @__PURE__ */ React.createElement(Text, {
      fontSize: 56,
      lineHeight: "1em"
    }, "4,117,347")),
    /* @__PURE__ */ React.createElement(VStack, {
      alignItems: "flex-start"
    }, /* @__PURE__ */ React.createElement(Heading, {
      size: "md"
    }, "Jumlah", " ", /* @__PURE__ */ React.createElement(Text, {
      as: "span",
      color: "red.400",
      fontSize: "inherit"
    }, "Meninggal")), /* @__PURE__ */ React.createElement(Text, {
      fontSize: 56,
      lineHeight: "1em"
    }, "144,155")),
    /* @__PURE__ */ React.createElement(VStack, {
      alignItems: "flex-start"
    }, /* @__PURE__ */ React.createElement(Heading, {
      size: "md"
    }, "Jumlah", " ", /* @__PURE__ */ React.createElement(Text, {
      as: "span",
      color: "yellow.400",
      fontSize: "inherit"
    }, "Dirawat")), /* @__PURE__ */ React.createElement(Text, {
      fontSize: 56,
      lineHeight: "1em"
    }, "7,388"))
  ];
  useEffect(() => {
    document.querySelector(`#carousel-dots`)?.appendChild(dotsContainer.current);
    return () => dotsContainer.current.remove();
  });
  return /* @__PURE__ */ React.createElement(Container, {
    layerStyle: "container.sm"
  }, /* @__PURE__ */ React.createElement(Flex, {
    textAlign: "center",
    position: "relative",
    width: "full",
    zIndex: "base",
    justifyContent: "center",
    color: "green.500",
    sx: {}
  }, /* @__PURE__ */ React.createElement(Heading, {
    zIndex: "base",
    bgColor: "white",
    size: "xs",
    width: "max-content",
    textTransform: "uppercase",
    fontWeight: "semibold",
    letterSpacing: "0.05em",
    px: 5
  }, "Statistik")), /* @__PURE__ */ React.createElement(Carousel, {
    autoPlay: true,
    interval: 5e3,
    loop: true,
    renderArrowLeft: (args) => null,
    renderArrowRight: (args) => null,
    renderDots: (args) => /* @__PURE__ */ React.createElement(Dot, {
      target: dotsContainer.current,
      length: SliderElements.length,
      ...args
    })
  }, SliderElements.map((v, i) => /* @__PURE__ */ React.createElement(Box, {
    key: i,
    p: 5
  }, /* @__PURE__ */ React.createElement(Box, {
    p: 5,
    boxShadow: "lg",
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "md"
  }, v)))), /* @__PURE__ */ React.createElement(HStack, {
    id: "carousel-dots",
    spacing: 0,
    gridGap: 2,
    justifyContent: "center",
    sx: {
      "& > *": {
        display: "contents"
      }
    }
  }));
}
