import "./styles/style.scss";

// Router
import Router from "./routes";

import "./scripts/customPrototypes";

// Local Storage To Storage Palette's
import initLocalStorage from "./scripts/useLocalStorage";

// Redirect
import Redirect from "./scripts/redirectTo";

// Pages
import Index from "./pages/index";
import Dark from "./pages/dark";
import Light from "./pages/light";
import About from "./pages/about";
import Page404 from "./pages/page404";
import MyPalettes from "./pages/my";

document.addEventListener("DOMContentLoaded", () => {
  const routes = Router();

  initLocalStorage();

  routes.get("/", () => {
    Index.render();
  });
  routes.get("/dark", () => {
    Dark.render();
  });
  routes.get("/light", () => {
    Light.render();
  });
  routes.get("/about", () => {
    About.render();
  });
  routes.get("/my", () => {
    MyPalettes.render();
  });
  routes.get("*", () => {
    Page404.render();
  });

  Redirect(routes);

  routes.init();
});
