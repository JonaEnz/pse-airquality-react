import React from 'react';

export default class ErrorPage extends React.Component<IErrorPageProps, IErrorPageState> {

    code: number;
    message: string;

    constructor(props: any) {
        super(props);

        this.code = this.props.code;
        this.message = this.props.message;
    }

    render() {
        return (
            <div className="informationPage">
                <h1>Error</h1>
                <h2>{this.code}</h2>
                <p>{this.message}</p>
            </div>
        );
    }
}

interface IErrorPageProps {
    code: number;
    message: string;
}

interface IErrorPageState {


}