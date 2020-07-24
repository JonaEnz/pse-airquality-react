import React from "react";
import { Fragment } from "react";
import Language from "../Controller/Storage/Language";

let language = Language.getInstance();

export default class AboutPage extends React.Component<
    IAboutPageProps,
    IAboutPageState
    >{

    render() {
        return (
            <Fragment>
                <h1>{language.getText("about")}</h1>
                <h3>{language.getText("aboutText")}</h3>
            </Fragment>
        );
    }
}

interface IAboutPageProps { }

interface IAboutPageState { }
