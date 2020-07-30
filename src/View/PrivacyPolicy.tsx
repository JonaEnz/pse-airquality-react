import React from "react";
import { Fragment } from "react";
import Language from "../Controller/Storage/Language";

let language = Language.getInstance();

export default class PrivacyPolicyPage extends React.Component<
    IPrivacyPolicyPageProps,
    IPrivacyPolicyPageState
    > {
    render() {
        return <Fragment>
            <h1>{language.getText("privacyPolicy")}</h1>
            <h4>{language.getText("privacyPolicyText")}</h4>
        </Fragment>
    }
}

interface IPrivacyPolicyPageProps { }

interface IPrivacyPolicyPageState { }
