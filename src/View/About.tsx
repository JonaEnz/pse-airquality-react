import React from "react";
import { Fragment } from "react";
import Language from "../Controller/Storage/Language";

let language = Language.getInstance();

export default class AboutPage extends React.Component<
    IAboutPageProps,
    IAboutPageState
    > {
    render() {
        return <Fragment>
            <p>
                <h1>{language.getText("about")}</h1>
                <h4>{language.getText("aboutText")}</h4>
            </p>

        </Fragment>
    }
}

interface IAboutPageProps { }

interface IAboutPageState { }