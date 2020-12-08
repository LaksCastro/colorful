import "./styles.scss";
import Hammer from "hammerjs";
import SimpleToast from "../SimpleToast";
import { copyToClipboard } from "../../../scripts/utils";

function PaletteCard(color) {
  const colorString = `<p>${color}</p>`;
  const colorNode = colorString.stringToHTML();

  const paletteString = `
        <div style="background-color: ${color}" class="p-item"></div>
    `;

  const paletteNode = paletteString.stringToHTML();

  const colorHammer = new Hammer(colorNode);

  colorHammer.on("tap", () => {
    copyToClipboard(color);
    SimpleToast("Copied to clipboard!");
  });

  paletteNode.appendChild(colorNode);

  return paletteNode;
}

export default PaletteCard;
