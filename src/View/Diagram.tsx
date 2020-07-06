import React from 'react';
import { Fragment } from 'react'

export default class Diagram extends React.Component<IDiagramProps, IDiagramState> {
    constructor(props: IDiagramProps) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <h1>Diagram</h1>
            </Fragment>
        );
    }
}

interface IDiagramProps { }

interface IDiagramState { }