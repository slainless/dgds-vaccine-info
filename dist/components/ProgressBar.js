import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../_snowpack/pkg/react.js";
import {Box} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useEffect, useRef, useState} from "../../_snowpack/pkg/react.js";
import {useLoadingContext} from "./LoadingContext.js";
export default function ProgressBar() {
  const ref = useRef(null);
  const {isLoading, totalProgress} = useLoadingContext();
  const [isHidden, setHidden] = useState(true);
  const timing = 0.75;
  const startingOffset = 0.05;
  const delayBeforeHidden = 1;
  useEffect(() => {
    if (isLoading)
      setHidden(false);
  }, [isLoading]);
  useEffect(() => {
    if (ref.current == null)
      return;
    if (totalProgress == null)
      return;
    ref.current.style.width = `${(totalProgress * (1 - startingOffset) + startingOffset) * 99.8}%`;
    if (totalProgress === 1)
      setTimeout(() => setHidden(true), (timing + delayBeforeHidden) * 1e3);
  }, [totalProgress]);
  return /* @__PURE__ */ React.createElement(Box, {
    position: "fixed",
    top: 0,
    hidden: isHidden,
    transition: `all ${timing}s`,
    transitionTimingFunction: "ease-out",
    bgColor: "green",
    height: "3px",
    zIndex: "overlay",
    ref
  });
}
