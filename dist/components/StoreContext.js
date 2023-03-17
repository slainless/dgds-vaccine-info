import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import contextFactory from "../functions/contextFactory.js";
export const {
  context: StoreContext,
  provider: StoreProvider,
  hook: useStoreContext
} = contextFactory({
  lastScroll: [{}, (_) => _],
  locations: [null, (_) => _],
  searchFuse: [null, (_) => _],
  searchInput: [null, (_) => _],
  regions: [null, (_) => _]
});
