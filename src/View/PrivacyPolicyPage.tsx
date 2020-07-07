import React from 'react';
import { Fragment } from 'react';
import { render } from '@testing-library/react';

export default class PrivacyPolicyPage extends React.Component<IPrivacyPolicyPageProps, IPrivacyPolicyPageState> {
    constructor(props: IPrivacyPolicyPageProps) {
        super(props);
    }

    render() {
        return (
            <h1>Privacy Policy Page</h1>
        );
    }
}

interface IPrivacyPolicyPageProps { }

interface IPrivacyPolicyPageState { }