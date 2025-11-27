// src/globalStyles.js
import { globalCss } from "./stitches.config";

export const globalStyles = globalCss({
  "*": { boxSizing: "border-box" },
  body: {
    margin: 0,
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    backgroundColor: "$bg",
    color: "$text",
  },
  a: { color: "inherit", textDecoration: "none" },
});
