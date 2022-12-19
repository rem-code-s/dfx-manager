import { createTheme } from "@mui/material/styles";

let _theme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#8266d6",
      contrastText: "#efedf8",
      // main: '#DDAD62'
    },
    secondary: {
      main: "#dd87c2",
      contrastText: "#efedf8",
      // main: '#E7EBD1'
    },
    background: {
      default: "#B5AF8F",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: "#efedf8",
          boxShadow: "0px 0px 10px rgba(111, 89, 133, 0.05)",
          color: "#3e374c",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 1,
      },
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
        elevation0: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, 0)",
        },
        elevation1: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .05)",
        },
        elevation2: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .1)",
        },
        elevation3: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .15)",
        },
        elevation4: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .20)",
        },
        elevation5: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .25)",
        },
        elevation6: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .30)",
        },
        elevation7: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .35)",
        },
        elevation8: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .40)",
        },
        elevation9: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .45)",
        },
        elevation10: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .50)",
        },
        elevation11: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .55)",
        },
        elevation12: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .60)",
        },
        elevation13: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .65)",
        },
        elevation14: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .70)",
        },
        elevation15: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .75)",
        },
        elevation16: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .80)",
        },
        elevation17: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .85)",
        },
        elevation18: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .90)",
        },
        elevation19: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, .95)",
        },
        elevation20: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, 1)",
        },
        elevation21: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, 1)",
        },
        elevation22: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, 1)",
        },
        elevation23: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, 1)",
        },
        elevation24: {
          boxShadow: "0px 0px 10px rgba(111, 89, 133, 1)",
        },
        root: {
          background: "linear-gradient( 113.27deg, #c9bbe3 0%, #eed4e1 46.8%, #e8d7e5 100% )",
        },
      },
    },
  },
  typography: {
    allVariants: {
      fontFamily: "CircularXX,sans-serif",
    },
    h1: {
      [_theme.breakpoints.down("md")]: {
        fontSize: `calc(${_theme.typography.h1.fontSize} / 2)`,
      },
    },
    h2: {
      [_theme.breakpoints.down("md")]: {
        fontSize: `calc(${_theme.typography.h2.fontSize} / 2)`,
      },
    },
    h3: {
      [_theme.breakpoints.down("md")]: {
        fontSize: `calc(${_theme.typography.h3.fontSize} / 2)`,
      },
    },
    h4: {
      fontSize: "1.14rem",
    },
    h5: {},
    h6: {},
    body1: {
      color: "#3e374c",
    },
    button: {
      color: "#efedf8",
      textTransform: "none",
      fontSize: "1rem",
    },
  },
});

export { theme };
