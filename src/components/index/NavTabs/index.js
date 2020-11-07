import "./styles.scss";

import Hammer from "hammerjs";

import { redirect } from "../../../scripts/redirectTo";

import { getLiquidRoute } from "../../../scripts/utils";

import tabs from "./tabs";

function styleIfActive(firstColor, secondColor) {
    return `border-left: 2px solid transparent; 
            border-image: linear-gradient(to bottom, ${firstColor}, ${secondColor});
            border-image-slice: 1;
            background-color: var(--content-hovered);
        `
}

function NavTabItem(name, firstColor, secondColor, path) {
    let isActive = getLiquidRoute(window.location.pathname) === path;

    const gradient = `background: linear-gradient(to bottom, ${firstColor} 50%, ${secondColor} 50%)`

    const navTabString = `
        <li style="
            ${isActive ? styleIfActive(firstColor, secondColor) : ""}" 
            class="nav-body-item"
        >
            <div style="${gradient}" class="nav-body-item-icon"></div>
            <p class="nav-body-item-text">${name}</p>
        </li>
    `

    const navTabNode = navTabString.stringToHTML();

    const navTabHammer = new Hammer(navTabNode);
  
    navTabHammer.on("tap", () => redirect(path));

    return navTabNode;
}

function NavTabs() {
    const navWrapperString = `
        <nav id="nav-tab-wrapper" class="hide">
        </nav>
    `
    const navContainerString = `
        <div id="nav-tab-container"></div>
    `;

    const navFooterString = `
        <div id="nav-icons-wrapper">
            <p>Created By</p>
            <a id="nav-link-github" target="_blank" rel="noopener noreferrer external"
                href="https://github.com/LaksCastro">
                <i class="fab fa-github-square"></i>
            </a>
            <a id="nav-link-twitter" target="_blank" rel="noopener noreferrer external"
                href="https://twitter.com/LaksCastro">
                <i class="fab fa-twitter-square"></i>
            </a>
        </div>
    `

    const navHeaderString = `
        <div id="nav-header-wrapper">
            <img src="${process.env.PATH_BASE === "/" ? "/assets/logo.png" : `${process.env.PATH_BASE}/assets/logo.png`}">
        </div>
    `
    const navBodyString = `
        <ul id="nav-body-wrapper"></ul>
    `

    const navSpanCloseString = `
        <nav id="nav-span-close"></nav>
    `
    const navSpanCloseNode = navSpanCloseString.stringToHTML();
    const navSpanCloseHammer = new Hammer(navSpanCloseNode);
    navSpanCloseHammer.on("tap", closeDrawer);

    const navHeaderNode = navHeaderString.stringToHTML();
    const navBodyNode = navBodyString.stringToHTML();

    tabs.forEach(tab => {
        const item = NavTabItem(tab.name, tab.colors[0], tab.colors[1], tab.path);
        navBodyNode.appendChild(item);
    });

    const navWrapperNode = navWrapperString.stringToHTML();

    const navContainerNode = navContainerString.stringToHTML();

    const navWrapperHammer = new Hammer(navWrapperNode);
    navWrapperHammer.on("swiperight", closeDrawer);

    const navFooterNode = navFooterString.stringToHTML();

    navWrapperNode.appendChild(navSpanCloseNode);
    navContainerNode.appendChild(navHeaderNode);
    navContainerNode.appendChild(navBodyNode);
    navContainerNode.appendChild(navFooterNode);
    navWrapperNode.appendChild(navContainerNode);

    return navWrapperNode;
}

let onToggleState = null;

function onToggle(callback) {
    onToggleState = callback;
}
function drawerIsOpened() {
    return document.getElementById("nav-tab-wrapper").classList.contains("visible");
}
function closeDrawer() {
    if (!drawerIsOpened()) return;
    toggleDrawer();
}
function openDrawer() {
    if (drawerIsOpened()) return;
    toggleDrawer();
}
function toggleDrawer() {
    const drawer = document.getElementById("nav-tab-wrapper");
    if (drawerIsOpened()) {
        drawer.classList.remove("visible");
        drawer.classList.add("hide");
    } else {
        drawer.classList.remove("hide");
        drawer.classList.add("visible");
    }
    onToggleState && onToggleState();
}

export {
    onToggle,
    closeDrawer,
    openDrawer,
    toggleDrawer
}

export default NavTabs;
