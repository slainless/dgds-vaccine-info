import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../_snowpack/pkg/react.js";
import {
  Container,
  Box,
  Grid,
  Button,
  Icon
} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {useLoadingContext} from "../LoadingContext.js";
import {useMemo} from "../../../_snowpack/pkg/react.js";
import {
  MdOutlineMedicalServices,
  MdOutlineHome,
  MdInfoOutline
} from "../../../_snowpack/pkg/react-icons/md.js";
import {NavLink as RouterLink, useLocation} from "../../../_snowpack/pkg/react-router-dom.js";
import {useStoreContext} from "../StoreContext.js";
function NavButton(props) {
  const {children, icon: PIcon, ...rest} = props;
  const LinkUsed = props.to === "#" ? Button : RouterLink;
  return /* @__PURE__ */ React.createElement(Button, {
    as: LinkUsed,
    size: "sm",
    height: "initial",
    variant: "ghost",
    borderRadius: "none",
    display: "flex",
    flexDir: "column",
    w: 24,
    sx: {
      "&.active": {
        color: "green.600"
      }
    },
    _disabled: {
      bgColor: "white"
    },
    ...rest
  }, /* @__PURE__ */ React.createElement(Icon, {
    as: PIcon,
    boxSize: 7
  }), children);
}
export default function LayoutFooter() {
  const location = useLocation();
  const {isLoading} = useLoadingContext();
  const {
    locations: [locations]
  } = useStoreContext();
  const locationLink = useMemo(() => {
    return locations?.pathname ?? null;
  }, [locations]);
  return /* @__PURE__ */ React.createElement(Box, {
    width: "full",
    bgColor: "white",
    borderTop: "1px solid",
    borderTopColor: "gray.200",
    height: 14,
    position: "fixed",
    bottom: 0,
    zIndex: 1410
  }, /* @__PURE__ */ React.createElement(Container, {
    maxW: "container.sm",
    height: "inherit",
    justifyContent: "center",
    display: "flex"
  }, /* @__PURE__ */ React.createElement(Grid, {
    templateColumns: "repeat(3, max-content)",
    gridGap: 5,
    height: "inherit",
    justifyItems: "center"
  }, /* @__PURE__ */ React.createElement(NavButton, {
    icon: MdOutlineHome,
    to: "/"
  }, "Beranda"), /* @__PURE__ */ React.createElement(NavButton, {
    icon: MdOutlineMedicalServices,
    to: locationLink ?? "#",
    disabled: locationLink == null
  }, "Lokasi"), /* @__PURE__ */ React.createElement(NavButton, {
    icon: MdInfoOutline,
    to: "#",
    disabled: true
  }, "Informasi"))));
}
