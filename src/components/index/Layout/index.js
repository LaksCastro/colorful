import NavBar from "../NavBar";
import ThemeButton from "../ThemeButton";
import ScrollTopButton from "../ScrollTopButton";
import TransitionSpan from "../TransitionSpan";
import InterfacePreview from "../InterfacePreview";
import NavTabs from "../NavTabs";

const Layout = function (children) {
  return [NavBar, NavTabs, children, InterfacePreview, ThemeButton, ScrollTopButton, TransitionSpan];
}

export default Layout;
