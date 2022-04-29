import CssReset from "./CssReset";
import GlobalStyles from "./GlobalStyles";
import Theme from "./Theme";

const Styles = ({ children }) => (
  <>
    <CssReset />
    <GlobalStyles />
    <Theme>{children}</Theme>
  </>
);

export default Styles;
