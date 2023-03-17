import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import React from "../../_snowpack/pkg/react.js";
import {useContext} from "../../_snowpack/pkg/react.js";
export default function contextFactory(defaultValue) {
  const context = React.createContext(defaultValue);
  const provider = context.Provider;
  const hook = () => {
    const ctx = useContext(context);
    return ctx;
  };
  return {
    context,
    provider,
    hook
  };
}
