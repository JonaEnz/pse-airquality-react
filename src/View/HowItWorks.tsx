import React from "react";
import Language from "../Controller/Storage/Language";
import "./informationPage.css";

let language = Language.getInstance();

export default class HowItWorks extends React.Component<
    IHowItWorksProps,
    IHowItWorksState> {
    render() {
        return <div>
            <p className="informationPage">
                <h1>{language.getText("instructions")}</h1>
                <h3>{language.getText("shortDescription")}</h3>
            </p>
            <p className="informationPage">
                <h2><u>{language.getText("SearchTitle")}</u></h2>
                <h3>{language.getText("Search")}</h3>
            </p>
            <p className="informationPage">
                <h2><u>{language.getText("locationTitle")}</u></h2>
                <h3>{language.getText("location")}</h3>
            </p>
            <p className="informationPage">
                <h2><u>{language.getText("FeatureMenuTitle")}</u></h2>
                <h3>{language.getText("FeatureMenu")}</h3>
            </p>
            <p className="informationPage">
                <h2><u>{language.getText("ValuesTitle")}</u></h2>
                <h3>{language.getText("Values")}</h3>
            </p>
        </div>

    }
}

interface IHowItWorksProps { }

interface IHowItWorksState { }
