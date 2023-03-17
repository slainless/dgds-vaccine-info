const Styles = {
  fonts: {
    heading: `Poppins, -apple-system,'BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'`,
    body: `-apple-system,'BlinkMacSystemFont','Segoe UI','Roboto','Helvetica Neue','Arial','Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`
  },
  layerStyles: {
    "constraint-sm": {
      maxW: "container.sm",
      px: 2
    }
  },
  styles: {
    global: {
      body: {
        margin: 0,
        fontSmooth: "initial",
        MozOsxFontSmoothing: "initial",
        WebkitFontSmoothing: "initial",
        textRendering: "initial",
        color: "rgba(35, 33, 41, 0.8)",
        fontWeight: "normal",
        wordWrap: "break-word",
        fontKerning: "normal",
        fontStretch: "100%",
        fontFeatureSettings: `'kern', 'liga', 'clig', 'calt'`
      }
    }
  }
};
export default Styles;
