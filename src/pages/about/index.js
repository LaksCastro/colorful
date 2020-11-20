import "./styles.scss";

import "../../assets/images/about.svg";

import { removeAllChildsOf } from "../../scripts/utils";

import Layout from "../../components/index/Layout";

const aboutContent = {
  title: "Colorful - A very simple project",
  description: `Created in order to study Vanilla Js, that's why it was built on the main web technologies: 
                    HTML, CSS, VanillaJs, Webpack 4 and Babel`,
  img: "about.svg",
};

const AboutPage = {
  render: function () {
    const root = document.getElementById("root");
    removeAllChildsOf(root);

    const AboutWrapperString = `
            <div id="about-wrapper">
                <img src="${
                  process.env.PATH_BASE === "/"
                    ? "/assets/" + aboutContent.img
                    : `${process.env.PATH_BASE}/assets/${aboutContent.img}`
                }" />
                <h1>${aboutContent.title}</h1>
                <p>${aboutContent.description}</p>
                <p>All code is available in <a target="_blank" rel="noopener noreferrer external" href="https://github.com/LaksCastro/colorful">this Github repository</a></p>
            </div>
        `;

    const AboutWrapperNode = AboutWrapperString.stringToHTML();

    Layout(() => AboutWrapperNode).forEach((content) =>
      root.appendChild(content())
    );
  },
};

export default AboutPage;
