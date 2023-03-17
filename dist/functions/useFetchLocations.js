import {useMemo} from "../../_snowpack/pkg/react.js";
import {
  DetailMeta,
  ApiSource
} from "../types/definition.js";
import useFetchJSON from "./useFetchJSON.js";
import {useStoreContext} from "../components/StoreContext.js";
import {assertKipiDetail, assertVidDetail, LocationDetail} from "./Location.js";
const INCLUDE_KIPI = false;
export default function useFetchLocations(input) {
  const {
    regions: [regions]
  } = useStoreContext();
  let url = [];
  if (regions != null && input != null) {
    const vidInput = regions.toApi(input, ApiSource.VAKSINASI_ID);
    const kipiInput = regions.toApi(input, ApiSource.KIPI_COVID_19_GO_ID);
    url[0] = `https://api.vaksinasi.id/locations/${vidInput.province}?city=${vidInput.city}`;
    url[1] = `https://kipi.covid19.go.id/api/get-faskes-vaksinasi?skip=0&province=${kipiInput.province}&city=${kipiInput.city}`;
  }
  const {response: vidResponse, startFetch: vStart} = useFetchJSON(url[0], {
    name: `location_${ApiSource.VAKSINASI_ID}`
  });
  const {response: kipiResponse, startFetch: kStart} = useFetchJSON(url[1], {
    name: `location_${ApiSource.KIPI_COVID_19_GO_ID}`
  });
  const locations = useMemo(() => {
    if (vidResponse == null || INCLUDE_KIPI && kipiResponse == null)
      return null;
    assertVidDetail(vidResponse);
    const data = [
      ...vidResponse.data.map((v) => ({
        ...v,
        [DetailMeta]: ApiSource.VAKSINASI_ID
      }))
    ];
    if (INCLUDE_KIPI) {
      assertKipiDetail(kipiResponse);
      data.push(...kipiResponse.data.map((v) => ({
        ...v,
        [DetailMeta]: ApiSource.KIPI_COVID_19_GO_ID
      })));
    }
    console.log(data);
    return data.map((v) => new LocationDetail(v));
  }, INCLUDE_KIPI ? [vidResponse, kipiResponse] : [vidResponse]);
  function fetch() {
    vStart();
    if (INCLUDE_KIPI)
      kStart();
  }
  return {locations, fetch};
}
