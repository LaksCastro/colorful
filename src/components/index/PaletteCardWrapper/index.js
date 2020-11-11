import "./styles.scss";

import Hammer from "hammerjs";

import { useLocalStorage } from "../../../scripts/useLocalStorage";

import PaletteCard from "../PaletteCard";
import SimpleToast from "../SimpleToast";

import { generateRandomNumber, createUniqueId } from "../../../scripts/utils";

function getCardsColors(colors) {
    return colors.map(color => `<div data-height="crescent" style="background-color: ${color};"></div>`).join("");
}

function PaletteCardWrapper(colorsArray, id) {

    const isSaved = !!id;

    function toggleFavoritePalette() {

        const id = paletteButtonFavoriteNode.getAttribute("palette-id");

        const currentFavorites = useLocalStorage().getPalettes();

        if (!!currentFavorites.filter(fav => fav.id === id)[0]) {
            paletteButtonFavoriteNode.style.background = "transparent";
            paletteButtonFavoriteNode.style.border = "1px solid var(--content-hovered)";

            paletteButtonFavoriteIconNode.style.color = "var(--color-light)";
            paletteButtonFavoriteIconNode.classList.remove("fas");
            paletteButtonFavoriteIconNode.classList.add("far");

            useLocalStorage().setPalettes(currentFavorites.filter(fav => fav.id !== id));
        } else {
            const newFavorite = {
                colors: colorsArray,
                id,
                date: new Date()
            }
            paletteButtonFavoriteNode.style.background = colorsArray[1];
            paletteButtonFavoriteNode.style.border = `1px solid ${colorsArray[1]}`;

            paletteButtonFavoriteIconNode.style.color = "#fff";
            paletteButtonFavoriteIconNode.classList.remove("far");
            paletteButtonFavoriteIconNode.classList.add("fas");

            useLocalStorage().setPalettes([...currentFavorites, newFavorite]);
        }
    }

    const dataAppear = generateRandomNumber(0, 1) === 1 ? "right" : "left";

    const paletteString = `
       <section class="p-item-container" data-appear="${dataAppear}"></section>
    `

    const paletteButtonFavoriteIconString = `
        <i class="far fa-heart"></i>
    `
    const paletteButtonFavoriteString = `
        <button palette-id="${isSaved ? id : createUniqueId()}" class="p-item-button"></button>
    `
    const paletteButtonPreviewString = `
        <button class="p-item-button">
            <i class="fas fa-expand"></i>
        </button>
    `
    const paletteButtonString = `
        <div class="p-item-buttons-wrappers"></div>
    `
    const paletteContainerColorsString = `
        <div class="p-item-colors-wrapper" data-appear="${dataAppear}"></div>
    `

    const paletteButtonFavoriteNode = paletteButtonFavoriteString.stringToHTML();

    const paletteButtonFavoriteIconNode = paletteButtonFavoriteIconString.stringToHTML();

    paletteButtonFavoriteNode.appendChild(paletteButtonFavoriteIconNode);

    const paletteButtonPreviewNode = paletteButtonPreviewString.stringToHTML();

    const paletteNode = paletteString.stringToHTML();

    const paletteButtonNode = paletteButtonString.stringToHTML();

    const paletteContainerColorsNode = paletteContainerColorsString.stringToHTML();

    colorsArray.forEach(color => paletteContainerColorsNode.appendChild(PaletteCard(color)));

    paletteButtonPreviewNode.onclick = () => window.__openInterfacePreview(colorsArray);

    paletteButtonNode.appendChild(paletteButtonFavoriteNode);

    paletteButtonNode.appendChild(paletteButtonPreviewNode);

    paletteNode.appendChild(paletteContainerColorsNode);
    paletteNode.appendChild(paletteButtonNode);

    const paletteButtonFavoriteHammer = new Hammer(paletteButtonFavoriteNode);
    paletteButtonFavoriteHammer.on("tap", () => {
        toggleFavoritePalette();
        SimpleToast("Saved!");
    })

    const paletteNodeHammer = new Hammer(paletteNode, { taps: 2 });
    paletteNodeHammer.on("doubletap press", () => window.__openInterfacePreview(colorsArray));

    if (isSaved) {
        paletteButtonFavoriteNode.style.background = colorsArray[1];
        paletteButtonFavoriteNode.style.border = `1px solid ${colorsArray[1]}`;

        paletteButtonFavoriteIconNode.style.color = "#fff";
        paletteButtonFavoriteIconNode.classList.remove("far");
        paletteButtonFavoriteIconNode.classList.add("fas");
    }
    return paletteNode;
}

export default PaletteCardWrapper;
