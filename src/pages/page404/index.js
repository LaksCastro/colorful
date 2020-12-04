import "./styles.scss";

import "../../assets/images/404.svg";

import { removeAllChildsOf } from "../../scripts/utils";

import { redirect } from "../../scripts/redirectTo";

const IndexPage = {
  render: function () {
    const page404 = `
            <div id="page-404">
                <h1>40</h1>
                <p>Nothing here, sorry</p>
                <button id="go-back-button">Go Back</button>
                <img src="${
                  process.env.PATH_BASE === "/"
                    ? "/assets/404.svg"
                    : `${process.env.PATH_BASE}/assets/404.svg`
                }" />
            </div>
        `;
    const rootElement = document.getElementById("root");

    removeAllChildsOf(rootElement);
    rootElement.appendChild(page404.stringToHTML());

    document.getElementById("go-back-button").onclick = () => redirect("/");
  },
};

export default IndexPage;
