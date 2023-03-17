import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import {useStoreContext} from "../components/StoreContext.js";
import {useEffect} from "../../_snowpack/pkg/react.js";
import {useCityParam} from "./useParam.js";
export default function useSetInitialSearch() {
  const {
    searchInput: [searchInput, setSearchInput],
    searchFuse: [searchFuse]
  } = useStoreContext();
  const city = useCityParam();
  useEffect(() => {
    if (searchInput != null || city == null || searchFuse == null)
      return;
    setSearchInput({
      inputValue: city ? city.city : "",
      dropdownData: city ? searchFuse.search(city.city).slice(0, 5).map((r) => r.item) : []
    });
  }, [searchFuse, city]);
}
