import React from 'react';
import { Card, Divider, Typography, Grid, CircularProgress, Select, MenuItem, } from '@material-ui/core';
import Chart from "react-google-charts";

import IDiagramController from '../../Controller/DiagramController';

export default class Diagram extends React.Component<IDiagramProps, IDiagramState> {
    //controller for this diagram
    controller: IDiagramController;

    constructor(props: IDiagramProps) {
        super(props);
        this.controller = this.props.controller;

        //setup default configuration in state
        this.state = {
            configurationOption: this.controller.getDefaultConfigurationOption(),
        }

        this.handleConfigurationChange = this.handleConfigurationChange.bind(this);
    }

    //styles of this component
    styles = {
        header: {
            padding: '10px',
            paddingLeft: '40px',
        },
        diagram: {
            width: '100%',
            height: '350px',
        },
    };

    //change configuration in state
    handleConfigurationChange(event: React.ChangeEvent<{ value: unknown }>) {
        this.setState({
            configurationOption: (event.target.value as string),
        });
    }

    //return configuration options as menu items
    renderConfigurationOptions() {
        var configurationOptions = this.controller.getConfigurationOptions();
        return (
            configurationOptions.map((option) =>
                <MenuItem value={option}>{option}</MenuItem>
            )
        );
    }

    //render component
    render() {
        return (
            <Card>
                <div style={this.styles.header}>
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>
                            <Typography variant='subtitle1'>{this.controller.feature.getName()}</Typography>
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
                    width={this.styles.diagram.width}
                    height={this.styles.diagram.height}
                    chartType={this.controller.getChartType()}
                    loader={
                        <Grid container justify='center' alignContent='center' style={this.styles.diagram}>
                            <CircularProgress />
                        </Grid>
                    }
                    data={this.controller.getData(this.state.configurationOption)}
                />
            </Card>
        );
    }
}

export interface IDiagramProps {
    controller: IDiagramController;
}

interface IDiagramState {
    configurationOption: string;
}