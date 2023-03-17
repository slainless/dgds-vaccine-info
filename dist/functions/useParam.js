import {useMemo} from "../../_snowpack/pkg/react.js";
import {useParams} from "../../_snowpack/pkg/react-router-dom.js";
import hash from "../../_snowpack/pkg/object-hash.js";
import {useStoreContext} from "../components/StoreContext.js";
const cityParamCache = new Map();
export function useCityParam() {
  const {
    regions: [regions]
  } = useStoreContext();
  const params = useParams();
  const {province, city} = params;
  return useMemo(() => {
    if (regions == null)
      return null;
    if (province == null || city == null)
      return null;
    const hashed = hash({province, city});
    let result;
    if (result = cityParamCache.get(hashed) ?? null)
      return result;
    result = regions.toValidUnified({province, city}, "url") ?? false;
    cityParamCache.set(hashed, result);
    return result;
  }, [params, regions]);
}
export function useLocationHashParam() {
  const params = useParams();
  const {locationHash} = params;
  return locationHash ?? null;
}
