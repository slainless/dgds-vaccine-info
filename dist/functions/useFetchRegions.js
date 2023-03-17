import {useMemo} from "../../_snowpack/pkg/react.js";
import useFetchJSON from "./useFetchJSON.js";
import {assertRegion} from "./Region.js";
export function useFetchRegions() {
  const {response, ...rest} = useFetchJSON("https://api.vaksinasi.id/regions", {name: "region"});
  const regions = useMemo(() => {
    if (response == null)
      return null;
    assertRegion(response);
    return response.data;
  }, [response]);
  return {regions, ...rest};
}
