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
                <h1>{language.getText("privacyPolicy")}</h1>
                <h3>{language.getText("privacyPolicyText")}</h3>
            </p>
        </div>
    }
}

interface IHowItWorksProps { }

interface IHowItWorksState { }
