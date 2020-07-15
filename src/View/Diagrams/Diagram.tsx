import React from 'react';
import { Fragment } from 'react'
import Chart from "react-google-charts";

import { ObservationStation } from '../../Model/ObservationStation';
import { Feature } from '../../Model/Feature';
import DiagramController from '../../Controller/DiagramController';
import {
    CardContent,
    Card,
    Divider,
    Typography,
    Grid,
    CircularProgress,
    Select,
    MenuItem,
} from '@material-ui/core';
import IDiagramController from '../../Controller/DiagramController';

export default class Diagram extends React.Component<IDiagramProps, IDiagramState> {
    controller: IDiagramController;
    observationStation: ObservationStation;
    feature: Feature;

    configurationOptions: string[];

    constructor(props: IDiagramProps) {
        super(props);
        this.controller = this.props.controller;
        this.observationStation = this.controller.observationStation;
        this.feature = this.controller.feature;
        this.configurationOptions = this.controller.getConfigurationOptions();
        this.state = {
            configurationOption: this.controller.getDefaultConfigurationOption(),
        }
        this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
    }

    styles = {
        header: {
            padding: '10px',
            paddingLeft: '40px',
        },
    };

    handleConfigurationChange(event: React.ChangeEvent<{ value: unknown }>) {
        this.setState({
            configurationOption: (event.target.value as string),
        });
    }

    renderConfigurationOptions() {
        return (
            this.configurationOptions.map((configurationOption) =>
                <MenuItem value={configurationOption}>{configurationOption}</MenuItem>
            )
        );
    }

    render() {
        return (
            <Fragment>
                <Card>
                    <div style={this.styles.header}>
                        <Grid container justify='space-between' alignItems='center'>
                            <Grid item>
                                <Typography variant='subtitle1'>{this.feature.getName()}</Typography>
                            </Grid>
                            <Grid item>
                                <Select
                                    value={this.state.configurationOption}
                                    onChange={this.handleConfigurationChange}
                                >
                                    {this.renderConfigurationOptions()}
                                </Select>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider />
                    <Chart
                        width='100%'
                        height='350px'
                        chartType="LineChart"
                        loader={
                            <CardContent>
                                <CircularProgress />
                            </CardContent>
                        }
                        data={this.controller.getData(this.state.configurationOption)}
                    />
                </Card>

            </Fragment>
        );
    }
}

export interface IDiagramProps {
    controller: DiagramController;
}

interface IDiagramState {
    configurationOption: string;
}