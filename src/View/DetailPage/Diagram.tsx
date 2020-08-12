import React from "react";
import {
    Card,
    Divider,
    Typography,
    Grid,
    CircularProgress,
    Select,
    MenuItem,
} from "@material-ui/core";
import Chart from "react-google-charts";

import IDiagramController from "../../Controller/DiagramController/DiagramController";

export default class Diagram extends React.Component<
    IDiagramProps,
    IDiagramState
> {
    //controller for this diagram
    controller: IDiagramController;

    constructor(props: IDiagramProps) {
        super(props);
        this.controller = this.props.controller;

        //setup default configuration in state
        this.state = {
            data: null,
        };

        this.handleConfigurationChange = this.handleConfigurationChange.bind(
            this
        );
    }

    //styles of this component
    styles = {
        header: {
            padding: "10px",
            paddingLeft: "40px",
        },
        diagram: {
            width: "100%",
            height: "350px",
        },
    };

    //changes the diagrams configuration
    handleConfigurationChange(event: React.ChangeEvent<{ value: unknown }>) {
        let configurationOption = event.target.value as string;
        this.controller.setConfigurationOption(configurationOption);
        this.setState({
            data: null,
        });
        this.controller.getData(configurationOption).then((data) =>
            this.setState({
                data: data,
            })
        );
    }

    //return configuration options as menu items
    renderConfigurationOptions() {
        var configurationOptions = this.controller.getConfigurationOptions();
        return configurationOptions.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
        ));
    }

    //renders the configuration form of this diagram
    renderDiagramConfiguration() {
        //if configuration is enabled return select form with configuration options
        if (this.controller.isConfigurable()) {
            return (
                <Grid item>
                    <Select
                        value={this.controller.getCurrentConfigurationOption()}
                        onChange={this.handleConfigurationChange}
                    >
                        {this.renderConfigurationOptions()}
                    </Select>
                </Grid>
            );
            //not configurable return empty string
        } else return "";
    }

    componentDidMount() {
        this.controller
            .getData(this.controller.getCurrentConfigurationOption())
            .then((data) => this.setState({ data: data }));
    }

    renderChart() {
        if (this.state.data === null) {
            return (
                <Grid
                    container
                    justify="center"
                    alignContent="center"
                    style={this.styles.diagram}
                >
                    <CircularProgress />
                </Grid>
            );
        } else {
            return (
                <Chart
                    width={this.styles.diagram.width}
                    height={this.styles.diagram.height}
                    chartType={this.controller.getChartType()}
                    options={this.controller.getGraphicsOptions()}
                    loader={
                        <Grid
                            container
                            justify="center"
                            alignContent="center"
                            style={this.styles.diagram}
                        >
                            <CircularProgress />
                        </Grid>
                    }
                    data={this.state.data}
                />
            );
        }
    }

    //render component
    render() {
        return (
            <Card>
                <div style={this.styles.header}>
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="subtitle1">
                                {this.controller.feature.getName() +
                                    " [" +
                                    this.controller.feature.getUnitOfMeasurement() +
                                    "]"}
                            </Typography>
                        </Grid>
                        {this.renderDiagramConfiguration()}
                    </Grid>
                </div>
                <Divider />
                {this.renderChart()}
            </Card>
        );
    }
}

export interface IDiagramProps {
    controller: IDiagramController;
}

interface IDiagramState {
    data: Array<Array<Date | number | string | null>> | null;
}
