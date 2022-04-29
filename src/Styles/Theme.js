import { ThemeProvider } from "styled-components";

const theme = {
  palette: {
    primary: "#1976d2",
    secondary: "#9c27b0",
    error: "#d32f2f",
    warning: "#ed6c02",
  },
  boxShadow: {
    main: "rgb(0 0 0 / 20%) 0px 2px 4px -1px,rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
    light:
      "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 9px 1px, rgb(255 255 255) 0px 1px 10px 0px",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
