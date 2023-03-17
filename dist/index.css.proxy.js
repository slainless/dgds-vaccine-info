// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "/* body {\r\n  margin: 0;\r\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\r\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\r\n    sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n  color: rgba(35, 33, 41, 0.8);\r\n  font-weight: normal;\r\n  word-wrap: break-word;\r\n  font-kerning: normal;\r\n  -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';\r\n  -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';\r\n  -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';\r\n  font-feature-settings: 'kern', 'liga', 'clig', 'calt';\r\n} */\r\n\r\nbody,\r\nhtml,\r\n#root {\r\n  height: 100%;\r\n  transition: background-color 0.5s linear;\r\n}\r\n\r\ncode {\r\n  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\r\n    monospace;\r\n}\r\n/* \r\n.chakra-image {\r\n  image-rendering: -moz-crisp-edges; \r\n  image-rendering: -o-crisp-edges;\r\n  image-rendering: -webkit-optimize-contrast; \r\n  image-rendering: crisp-edges;\r\n  -ms-interpolation-mode: nearest-neighbor;\r\n} */\r\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}