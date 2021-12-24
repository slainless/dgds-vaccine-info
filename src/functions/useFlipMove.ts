import { useCallback, useEffect, useState } from 'react'
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
  trigger: React.ComponentState,
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

  const [rects, setRects] = useState<DOMRect[] | null>(null)
  const [node, setNode] = useState<HTMLElement | null>(null)
  const ref = useCallback((node: HTMLElement | null) => {
    if (node == null) {
      setNode(null)
      return
    }

    if (applyOnChildren) setRects(getChildrenRects(node))
    else setRects([node.getBoundingClientRect()])

    setNode(node)
    return
  }, [])

  useEffect(() => {
    if (node == null) return

    const oldRect = rects
    const newRect = applyOnChildren
      ? getChildrenRects(node)
      : [node.getBoundingClientRect()]

    setRects(newRect)
    if (oldRect == null) return

    const styleParams: StyleParams[] = applyOnChildren
      ? newRect.map((n, i) => {
          const o = oldRect[i]
          return { deltaX: o.left - n.left, deltaY: o.top - n.top }
        })
      : [
          {
            deltaX: oldRect[0].left - newRect[0].left,
            deltaY: oldRect[0].top - newRect[0].top,
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
        Object.entries(Array.from(node.children)).forEach(([i, child]) => {
          const param = styleParams[+i]
          if (child instanceof HTMLElement) applyOnNode(child, style(param))
        })
      else {
        const param = styleParams[0]
        applyOnNode(node, style(param))
      }
    }
    // @ts-ignore
    requestAnimationFrame(() => {
      applyStyle(reversionStyle)

      requestAnimationFrame(() => {
        applyStyle(normalizationStyle)
      })
    })
  }, [trigger])

  return { targetRef: ref }
}
