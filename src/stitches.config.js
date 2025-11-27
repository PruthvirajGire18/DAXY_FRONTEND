// src/stitches.config.js
import { createStitches } from "@stitches/react";

export const { styled, css, globalCss } = createStitches({
  theme: {
    colors: {
      bg: "#0b1120",
      bgCard: "#020617",
      primary: "#2563eb",
      primarySoft: "#1d4ed8",
      danger: "#ef4444",
      gray: "#6b7280",
      border: "#1f2937",
      text: "#f9fafb",
      textSoft: "#9ca3af",
      badgeLow: "#10b981",
      badgeMedium: "#facc15",
      badgeHigh: "#ef4444",
    },
    radii: {
      lg: "12px",
      full: "999px",
    },
    space: {
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
    },
  },
});
