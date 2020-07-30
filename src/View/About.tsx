import React from "react";
import Language from "../Controller/Storage/Language";
import "./informationPage.css";

let language = Language.getInstance();

export default class AboutPage extends React.Component<
    IAboutPageProps,
    IAboutPageState
    > {
    render() {
        return <div>
            <p className="informationPage">
                <h1>{language.getText("about")}</h1>
                <h3>{language.getText("aboutText")}</h3>
            </p>

        </div>
    }
}

interface IAboutPageProps { }

interface IAboutPageState { }