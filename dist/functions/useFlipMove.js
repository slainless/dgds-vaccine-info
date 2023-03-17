import {isEqual} from "../../_snowpack/pkg/lodash-es.js";
import {useState} from "../../_snowpack/pkg/react.js";
import defaultParams from "./defaultParams.js";
const getChildrenElements = (node) => Array.from(node.children).filter((node2) => node2 instanceof HTMLElement);
const getChildrenRects = (node) => getChildrenElements(node).map((child) => child.getBoundingClientRect());
export default function useFlipMove(target, options) {
  const {applyOnChildren, reversionStyle, normalizationStyle} = defaultParams(options, {
    applyOnChildren: false,
    reversionStyle: ({deltaX, deltaY}) => ({
      transform: `translate(${deltaX}px, ${deltaY}px)`,
      transition: "transform 0s"
    }),
    normalizationStyle: ({deltaX, deltaY}) => ({
      transform: "",
      transition: "transform 0.4s"
    })
  });
  const getRects = (node) => applyOnChildren ? getChildrenRects(node) : [node.getBoundingClientRect()];
  const [rects, setRects] = useState(null);
  function update() {
    console.log("update fired!");
    setRects((oldRects) => {
      const targetEl = target.current;
      if (targetEl == null)
        return null;
      const newRects = getRects(targetEl);
      if (oldRects == null || isEqual(oldRects, newRects))
        return newRects;
      console.log(oldRects, newRects, getChildrenElements(targetEl), applyOnChildren);
      const styleParams = applyOnChildren ? newRects.map((n, i) => {
        const o = oldRects[i];
        return {deltaX: o.left - n.left, deltaY: o.top - n.top};
      }) : [
        {
          deltaX: oldRects[0].left - newRects[0].left,
          deltaY: oldRects[0].top - newRects[0].top
        }
      ];
      const applyStyle = (style) => {
        const applyOnNode = (node, s) => Object.entries(s).forEach(([key, css]) => {
          node.style[key] = css;
        });
        if (applyOnChildren)
          Object.entries(Array.from(targetEl.children)).forEach(([i, child]) => {
            const param = styleParams[+i];
            if (child instanceof HTMLElement)
              applyOnNode(child, style(param));
          });
        else {
          const param = styleParams[0];
          applyOnNode(targetEl, style(param));
        }
      };
      requestAnimationFrame(() => {
        applyStyle(reversionStyle);
        requestAnimationFrame(() => {
          applyStyle(normalizationStyle);
        });
      });
      return newRects;
    });
  }
  return {updatePosition: update};
}
