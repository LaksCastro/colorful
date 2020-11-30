import "./styles.scss";

function ThemeButton() {
  const buttonString = `
        <button id="theme-button">
            <i class="fas fa-paint-roller"></i>
        </button>
    `;

  const buttonNode = buttonString.stringToHTML();
  buttonNode.onclick = () => {
    window.__toggleTransitionSpan();
    setTimeout(() => {
      window.__setPreferredTheme(window.__theme === "dark" ? "light" : "dark");
      setTimeout(() => {
        window.__toggleTransitionSpan();
      }, 300);
    }, 300);
  };

  return buttonNode;
}

export default ThemeButton;
