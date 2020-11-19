import Layout from "../../components/index/Layout";

import { removeAllChildsOf } from "../../scripts/utils";

import PaletteCardWrapper from "../../components/index/PaletteCardWrapper";

const index = function (...args) {
  const root = document.getElementById("root");

  removeAllChildsOf(root);

  const instance = {
    paletteArray: [],
    paletteWrapper: `
            <div id="palette-wrapper">
            </div>
        `,
    paletteContainer: `
            <div id="palette-container">
            </div>
        `,
    paletteWrapperNode: null,
    paletteContainerNode: null,

    init: function (customChildrenNode = false) {
      removeAllChildsOf(root);

      let children = null;

      if (customChildrenNode) {
        children = customChildrenNode;
      } else {
        this.paletteWrapperNode = this.paletteWrapper.stringToHTML();
        this.paletteContainerNode = this.paletteContainer.stringToHTML();

        this.paletteWrapperNode.appendChild(this.paletteContainerNode);
        children = this.paletteWrapperNode;
      }

      const contentNodes = Layout(() => children);

      contentNodes.forEach((content, i) => {
        const nodeElement = content();

        if (!nodeElement.customTratative) {
          root.appendChild(nodeElement);
        } else {
          // Do a custom tratative by Layout HTML order
          switch (i) {
            case 1:
              const { navNode, EmblaCarousel, options } = nodeElement;

              root.appendChild(navNode);

              EmblaCarousel(navNode, options);
              break;
          }
        }
      });
    },
    addPalette: function (colorsArray, id = false) {
      this.paletteArray.push(colorsArray);

      const palette = colorsArray.hex;
      const paletteCardWrapper = PaletteCardWrapper(palette, id);
      this.paletteContainerNode.appendChild(paletteCardWrapper);
    },
  };

  instance.init.apply(instance, [...args]);

  return instance;
};

export default index;
