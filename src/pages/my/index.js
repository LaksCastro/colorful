import IndexTemplate from "../index-template";

import "../../assets/images/void.svg";

import "./styles.scss";

import { useLocalStorage } from "../../scripts/useLocalStorage";

let palettes = null;

const noPalettesString = `
    <div id="no-palette-wrapper">
        <img src="${
          process.env.PATH_BASE === "/"
            ? "/assets/void.svg"
            : `${process.env.PATH_BASE}/assets/void.svg`
        }" />
        <h1>The beautiful palettes you save will appear here</h1>
        <h1>As belas paletas que você salvar aparecerão aqui</h1>
    </div>
`;
const noPalettesNode = noPalettesString.stringToHTML();

function renderPalette() {
  if (this.currentRenderIndex === palettes.length - 1)
    return (this.loadMore = () => {});

  let paletteArray = palettes[this.currentRenderIndex];

  this.index.addPalette(
    {
      hex: paletteArray.colors,
    },
    paletteArray.id
  );

  this.currentRenderIndex++;
}

const MyPalettesPage = {
  render: function () {
    palettes = useLocalStorage().getPalettes();
    palettes.reverse();

    if (!palettes.length) {
      IndexTemplate.render(
        undefined,
        undefined,
        undefined,
        noPalettesNode,
        () => {}
      );
    } else {
      if (palettes.length <= 20) {
        IndexTemplate.render(undefined, useLocalStorage().getPalettes());
      } else {
        IndexTemplate.render(undefined, undefined, renderPalette);
      }
    }
  },
};

export default MyPalettesPage;
