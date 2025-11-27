import { styled } from "../stitches.config";

export const PageWrapper = styled("div", {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "1.5rem 1rem",
});

export const Card = styled("div", {
  backgroundColor: "$bgCard",
  borderRadius: "$lg",
  border: "1px solid $border",
  padding: "1rem",
});

export const Button = styled("button", {
  borderRadius: "$full",
  border: "none",
  padding: "0.45rem 0.9rem",
  fontSize: "0.85rem",
  fontWeight: 600,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.25rem",
  variants: {
    variant: {
      primary: {
        backgroundColor: "$primary",
        color: "white",
        "&:hover": { backgroundColor: "$primarySoft" },
      },
      outline: {
        backgroundColor: "transparent",
        color: "$text",
        border: "1px solid $border",
      },
      ghost: {
        backgroundColor: "transparent",
        color: "$textSoft",
      },
      danger: {
        backgroundColor: "$danger",
        color: "white",
      },
    },
    size: {
      sm: { padding: "0.3rem 0.7rem", fontSize: "0.8rem" },
      md: {},
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export const Input = styled("input", {
  width: "100%",
  padding: "0.4rem 0.6rem",
  borderRadius: "$lg",
  border: "1px solid $border",
  backgroundColor: "#020617",
  color: "$text",
  fontSize: "0.85rem",
});

export const TextArea = styled("textarea", {
  width: "100%",
  padding: "0.4rem 0.6rem",
  borderRadius: "$lg",
  border: "1px solid $border",
  backgroundColor: "#020617",
  color: "$text",
  fontSize: "0.85rem",
});

export const Select = styled("select", {
  width: "100%",
  padding: "0.4rem 0.6rem",
  borderRadius: "$lg",
  border: "1px solid $border",
  backgroundColor: "#020617",
  color: "$text",
  fontSize: "0.85rem",
});

export const Label = styled("label", {
  fontSize: "0.8rem",
  color: "$textSoft",
  display: "block",
  marginBottom: "0.25rem",
});

export const ErrorText = styled("div", {
  fontSize: "0.8rem",
  color: "$danger",
  marginTop: "0.25rem",
});

export const Badge = styled("span", {
  padding: "0.15rem 0.6rem",
  borderRadius: "$full",
  fontSize: "0.75rem",
  fontWeight: 600,
  border: "1px solid $border",
  variants: {
    tone: {
      low: { color: "$badgeLow", borderColor: "$badgeLow" },
      medium: { color: "$badgeMedium", borderColor: "$badgeMedium" },
      high: { color: "$badgeHigh", borderColor: "$badgeHigh" },
    },
  },
});

export const ModalOverlay = styled("div", {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15,23,42,0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 50,
});

export const ModalContent = styled("div", {
  backgroundColor: "$bgCard",
  borderRadius: "$lg",
  border: "1px solid $border",
  padding: "1rem",
  width: "100%",
  maxWidth: "480px",
});
