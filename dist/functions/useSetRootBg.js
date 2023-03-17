import {useToken} from "../../_snowpack/pkg/@chakra-ui/react.js";
import {useEffect} from "../../_snowpack/pkg/react.js";
export default function useSetRootBg(color) {
  const bgColor = useToken("colors", color ?? "white");
  useEffect(() => {
    document.body.style.backgroundColor = color ? bgColor : "";
  }, []);
}
