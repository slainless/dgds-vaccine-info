import {useLoadingContext} from "../components/LoadingContext.js";
import {useState} from "../../_snowpack/pkg/react.js";
export default function useFetchJSON(input, options) {
  const {name} = options;
  const [res, setRes] = useState();
  const {setProgress, getProgress} = useLoadingContext();
  async function start() {
    if (input == null)
      return;
    setProgress(name, 0);
    const response = await fetch(input);
    const reader = response.body.getReader();
    const contentLength = +response.headers.get("Content-Length");
    let receivedLength = 0;
    let chunks = [];
    while (true) {
      const {done, value} = await reader.read();
      if (done)
        break;
      chunks.push(value);
      receivedLength += value.length;
      setProgress(name, receivedLength / contentLength);
    }
    const int8Data = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
      int8Data.set(chunk, position);
      position += chunk.length;
    }
    const textData = new TextDecoder("utf-8").decode(int8Data);
    setRes(JSON.parse(textData));
  }
  return {
    response: res,
    setResponse: setRes,
    startFetch: start
  };
}
