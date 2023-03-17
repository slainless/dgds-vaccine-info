import {useEffect, useState} from "../../_snowpack/pkg/react.js";
import defaultParams from "./defaultParams.js";
export default function useHasFocusWithin(ref, options) {
  const {onSetState} = defaultParams(options, {
    onSetState: (prevState, e) => {
    }
  });
  const [hasFocus, setFocus] = useState(document.hasFocus() && (ref.current?.contains(document.activeElement) ?? false));
  useEffect(() => {
    const target = ref.current;
    if (target == null)
      return;
    function focusInHandler(e) {
      if (target.contains(document.activeElement)) {
        setFocus((oldState) => {
          onSetState(oldState, e);
          return true;
        });
      }
    }
    document.addEventListener("focusin", focusInHandler);
    function focusOutHandler(e) {
      if (target.contains(document.activeElement) === false && target.contains(e.relatedTarget) === false) {
        setFocus((oldState) => {
          onSetState(oldState, e);
          return false;
        });
      }
    }
    document.addEventListener("focusout", focusOutHandler);
    return () => {
      document.removeEventListener("focusin", focusInHandler);
      document.removeEventListener("focusout", focusOutHandler);
    };
  }, []);
  return {hasFocus, setFocus};
}
