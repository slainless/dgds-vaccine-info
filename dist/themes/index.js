import {extendTheme} from "../../_snowpack/pkg/@chakra-ui/react.js";
import Styles from "./styles.js";
import Text from "./components/Text.js";
import Link from "./components/Link.js";
const Theme = {
  components: {
    Text,
    Link
  }
};
export default extendTheme(Theme, Styles);
