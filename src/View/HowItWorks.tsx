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
            </p>
        </div>
    }
}

interface IHowItWorksProps { }

interface IHowItWorksState { }
