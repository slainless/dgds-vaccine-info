import * as __SNOWPACK_ENV__ from '../../_snowpack/env.js';

const PUBLIC_URL = (path) => (__SNOWPACK_ENV__.SNOWPACK_PUBLIC_API_URL ?? "/") + path;
import contextFactory from "../functions/contextFactory.js";
import {useCallback, useContext, useMemo} from "../../_snowpack/pkg/react.js";
import {values} from "../../_snowpack/pkg/lodash-es.js";
export const {
  context: LoadingContext,
  provider: LoadingProvider
} = contextFactory({
  loading: [false, (_) => _],
  progress: [{}, (_) => _]
});
export function useLoadingContext() {
  const {
    loading: [loading, setLoading],
    progress: [progress, setProgress]
  } = useContext(LoadingContext);
  const _setProgress = (name, value) => {
    setProgress((prev) => {
      const newValue = {...prev};
      newValue[name] = value;
      return newValue;
    });
  };
  const totalProgress = useMemo(() => {
    if (Object.keys(progress).length === 0)
      return null;
    return values(progress).reduce((a, b) => a + b) / Object.keys(progress).length;
  }, [progress]);
  const isLoading = useMemo(() => totalProgress != null && totalProgress < 1, [totalProgress]);
  const getProgress = useCallback((name) => progress[name], [progress]);
  return {totalProgress, setProgress: _setProgress, isLoading, getProgress};
}
