import * as __SNOWPACK_ENV__ from '../../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../../_snowpack/pkg/react.js";
import {Heading, Link, VStack, Text} from "../../../_snowpack/pkg/@chakra-ui/react.js";
import {useStoreContext} from "../StoreContext.js";
import {defaults} from "../../../_snowpack/pkg/lodash-es.js";
import {useMemo} from "../../../_snowpack/pkg/react.js";
import {Link as RouterLink} from "../../../_snowpack/pkg/react-router-dom.js";
function DropdownItem(props) {
  const {
    regions: [regions]
  } = useStoreContext();
  const {
    city,
    ...rest
  } = props;
  const displayValue = city;
  const urlValue = useMemo(() => regions?.toApi(displayValue, "url"), [displayValue]);
  return /* @__PURE__ */ React.createElement(Link, {
    className: "city-item",
    as: RouterLink,
    to: `/${urlValue?.province}/${urlValue?.city}`,
    sx: {
      "&:first-of-type > div": {
        borderTop: "none"
      }
    },
    tabIndex: 0,
    ...rest
  }, /* @__PURE__ */ React.createElement(VStack, {
    spacing: 0,
    alignItems: "flex-start",
    width: "full",
    py: 1,
    borderTop: "1px solid",
    borderTopColor: "gray.200",
    pl: 4
  }, /* @__PURE__ */ React.createElement(Heading, {
    size: "sm"
  }, displayValue.city), /* @__PURE__ */ React.createElement(Text, null, displayValue.province)));
}
export default function CityDropdown(props) {
  const {data, onClickItem, ...rest} = defaults(props, {
    onClickItem: () => {
    }
  });
  return /* @__PURE__ */ React.createElement(VStack, {
    position: "absolute",
    top: "100%",
    width: "100%",
    zIndex: "hide",
    transform: "translateY(-0.5em)",
    border: "1px solid",
    borderColor: "gray.200",
    borderBottomRadius: "md",
    bgColor: "white",
    boxShadow: "md",
    pt: 3,
    alignItems: "stretch",
    spacing: 0,
    ...rest
  }, data.map((city, i) => /* @__PURE__ */ React.createElement(DropdownItem, {
    city,
    key: i,
    onClick: (e) => {
      onClickItem(city, e);
    }
  })));
}
