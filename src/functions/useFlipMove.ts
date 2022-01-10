import { isEqual } from 'lodash-es'
import { useCallback, useEffect, useRef, useState } from 'react'
import defaultParams from './defaultParams'
type Ref = React.MutableRefObject<HTMLElement | null>
type StyleParams = { deltaX: number; deltaY: number }
const getChildrenElements = (node: HTMLElement) =>
  Array.from(node.children).filter((node) => node instanceof HTMLElement)
const getChildrenRects = (node: HTMLElement) =>
  getChildrenElements(node).map((child) => child.getBoundingClientRect())

/**
 * Hook to add a transform animation on object that is triggered
 * by state change. Using `requestAnimationFrame` to attach/detach
 * transform props in target's style.
 * @export
 * @param ref Element as target for move animation
 * @param trigger State to watch for change
 */
export default function useFlipMove(
  target: React.RefObject<HTMLElement>,
  options?: {
    applyOnChildren?: boolean
    reversionStyle?: (props: StyleParams) => Partial<CSSStyleDeclaration>
    normalizationStyle?: (props: StyleParams) => Partial<CSSStyleDeclaration>
  },
) {
  const { applyOnChildren, reversionStyle, normalizationStyle } = defaultParams(
    options,
    {
      applyOnChildren: false,
      reversionStyle: ({ deltaX, deltaY }: StyleParams) => ({
        transform: `translate(${deltaX}px, ${deltaY}px)`,
        transition: 'transform 0s',
      }),
      normalizationStyle: ({ deltaX, deltaY }: StyleParams) => ({
        transform: '',
        transition: 'transform 0.4s',
      }),
    },
  )
  const getRects = (node: HTMLElement) =>
    applyOnChildren ? getChildrenRects(node) : [node.getBoundingClientRect()]

  const [rects, setRects] = useState<DOMRect[] | null>(null)
  function update() {
    console.log('update fired!')
    setRects((oldRects) => {
      const targetEl = target.current
      if (targetEl == null) return null

      const newRects = getRects(targetEl)
      if (oldRects == null || isEqual(oldRects, newRects)) return newRects
      console.log(
        oldRects,
        newRects,
        getChildrenElements(targetEl),
        applyOnChildren,
      )

      const styleParams: StyleParams[] = applyOnChildren
        ? newRects.map((n, i) => {
            const o = oldRects[i]
            return { deltaX: o.left - n.left, deltaY: o.top - n.top }
          })
        : [
            {
              deltaX: oldRects[0].left - newRects[0].left,
              deltaY: oldRects[0].top - newRects[0].top,
            },
          ]

      const applyStyle = (
        style: (param: StyleParams) => Partial<CSSStyleDeclaration>,
      ) => {
        const applyOnNode = (
          node: HTMLElement,
          s: Partial<CSSStyleDeclaration>,
        ) =>
          Object.entries(s).forEach(([key, css]) => {
            // TODO: fix type
            // @ts-ignore
            node.style[key] = css
          })

        if (applyOnChildren)
          Object.entries(Array.from(targetEl.children)).forEach(
            ([i, child]) => {
              const param = styleParams[+i]
              if (child instanceof HTMLElement) applyOnNode(child, style(param))
            },
          )
        else {
          const param = styleParams[0]
          applyOnNode(targetEl, style(param))
        }
      }
      // @ts-ignore
      requestAnimationFrame(() => {
        applyStyle(reversionStyle)

        requestAnimationFrame(() => {
          applyStyle(normalizationStyle)
        })
      })
      return newRects
    })
  }

  // useEffect(() => {
  //   if (ref.current == null) return
  // }, [ref])

  return { updatePosition: update }
}
