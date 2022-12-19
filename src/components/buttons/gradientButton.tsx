import { Button, ButtonProps, styled } from "@mui/material";
import React from "react";

export const GradientButton = styled(Button)<ButtonProps>(({ theme, variant }) => ({
  borderRadius: 8,
  ...(variant === "contained" && {
    background: `linear-gradient(80.26deg,${theme.palette.primary.main} 4.98%,${theme.palette.secondary.main} 90.33%)`,
    borderTop: "1px solid transparent",
    borderBottom: "1px solid transparent",
    boxShadow: "none",
    "&:hover": {
      background: "#8f75da",
      boxShadow: "none",
    },
  }),
  ...(variant === "outlined" && {
    border: "solid 2px transparent",
    background: "#ebe5f4",
    backgroundImage: `linear-gradient( 113.27deg, #c9bbe3 0%, #eed4e1 46.8%, #e8d7e5 100% ), linear-gradient(to right,${theme.palette.primary.main},${theme.palette.secondary.main})`,
    backgroundClip: "padding-box,border-box",
    "&:hover": {
      border: "solid 2px transparent",
      backgroundImage: `linear-gradient( 113.27deg, #ebe5f4 0%, #ebe5f4 46.8%, #ebe5f4 100% ), linear-gradient(to right,${theme.palette.primary.main},${theme.palette.secondary.main})`,
    },
  }),
}));
