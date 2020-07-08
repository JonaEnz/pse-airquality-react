import React from 'react';
import { Fragment } from 'react'

import { Grid, Card } from '@material-ui/core';
import { ObservationStation } from '../../Model/ObservationStation';
import { Feature } from '../../Model/Feature';

export default class Diagram extends React.Component<IDiagramProps, IDiagramState> {
    constructor(props: IDiagramProps) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <Grid item xl={8} lg={8} md={8} sm={12} xs={12} >
                    <Card>
                        <h1>Diagramm</h1>
                    </Card>
                </Grid>
            </Fragment>
        );
    }
}

export interface IDiagramProps {
    observationStation: ObservationStation;
    feature: Feature;
}

export interface IDiagramState { }