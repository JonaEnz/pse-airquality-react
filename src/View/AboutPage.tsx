import React from "react";
import { Fragment } from "react";

export default class AboutPage extends React.Component<
    IAboutPageProps,
    IAboutPageState
> {
    render() {
        return (
            <Fragment>
                <h1>AboutPage</h1>
            </Fragment>
        );
    }
}

interface IAboutPageProps {}

interface IAboutPageState {}
