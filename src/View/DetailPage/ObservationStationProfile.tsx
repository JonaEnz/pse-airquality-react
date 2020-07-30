import React from 'react';
import {
    Card,
    Typography,
    Divider,
    CardContent,
    Grid,
} from '@material-ui/core';

import { ObservationStation } from '../../Model/ObservationStation';
import ObservationItem from './ObservationItem';
import MockDataProvider from '../../Controller/MockDataProvider';
import { Color } from '../../Model/Color';
import { Observation } from '../../Model/Observation';
import Language from '../../Controller/Storage/Language';
import DataProvider from '../../Controller/Frost/DataProvider';

export default class ObservationStationProfile extends React.Component<IObservationStationProfileProps, IObservationStationProfileState> {

    languageProvider: Language;

    constructor(props: IObservationStationProfileProps) {
        super(props);
        this.state = {
            latestObservations: [],
        }
        this.languageProvider = Language.getInstance();
        this.getLatestObservations().then((o) => this.setState({ latestObservations: o }))
    }

    //styles for this component
    styles = {
        pos: {
            marginBottom: 12,
        },
        section_1: {
            padding: '20px',
        },
        section_2: {
            padding: '20px',
        },
        feature_container: {
            marginTop: '20px',
        },
    }

    //colors that are asignable to the observation items icons
    colors = [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
        '#9e9e9e',
        '#607d8b',
    ];


    //returns the latest observation for each feature of this observation station
    private async getLatestObservations(): Promise<Observation[]> {
        var features = this.props.observationStation.getFeatures();
        var observations = new Array<Observation>();
        var promises = [];

        features.forEach(feature => {
            var observation = DataProvider.getLatestObservation(this.props.observationStation, feature);
            promises.push(observation);
        });

        return observations;
    }

    //returns a random color from the above ones
    private getRandomColor() {
        var randomNumber = Math.round(Math.random() * (this.colors.length - 1));
        var color = this.colors[randomNumber];
        this.colors.splice(randomNumber, 1);
        return Color.getColorFromHex(color);
    }

    //returns JSX Elements for each latest observation
    private renderLatestObservations() {
        return this.state.latestObservations.map((observation) =>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <ObservationItem color={this.getRandomColor()} observation={observation} />
            </Grid>
        );
    }

    //returns the timestamp of the latest observation as a readable string
    private renderObservationDate() {
        if (this.state.latestObservations.length !== 0) {
            return this.languageProvider.getDateString(this.state.latestObservations[0].getTimeStamp());
        } else {
            return '';
        }
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <div style={this.styles.section_1}>
                        <Typography align="left" variant="h4" component='h2' >
                            {this.props.observationStation.getName()}
                        </Typography>
                        <Typography align="left" color='textSecondary' component="p" style={this.styles.pos}>
                            {this.props.observationStation.getPosition().getString()}
                        </Typography>
                        <Typography align='left' variant="body2" component="p" >
                            {this.props.observationStation.getDescription()}
                        </Typography>
                    </div>
                    <Divider variant="middle" />
                    <div style={this.styles.section_2}>
                        <Grid container alignItems='stretch'>
                            <Grid item xs>
                                <Typography align='left' variant='subtitle1'>
                                    {this.languageProvider.getText('last_measurement')}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color='textSecondary' variant='subtitle1'>
                                    {this.renderObservationDate()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container style={this.styles.feature_container} spacing={2}>

                            {this.renderLatestObservations()}

                        </Grid>
                    </div>
                </CardContent>
            </Card >
        );
    }
}

interface IObservationStationProfileProps {
    observationStation: ObservationStation;
}

interface IObservationStationProfileState {
    latestObservations: Observation[],
}

