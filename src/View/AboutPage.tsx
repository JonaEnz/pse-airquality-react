import React from 'react';
import { Fragment } from 'react'

export default class AboutPage extends React.Component<IAboutPageProps, IAboutPageState> {
    constructor(props: IAboutPageProps) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <h1>AboutPage</h1>
            </Fragment>
        );
    }
}

interface IAboutPageProps { }

interface IAboutPageState { }