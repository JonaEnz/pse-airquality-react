import React from 'react';
import { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';

import ObservationStationProfile from './ObservationStationProfile';
import DataProvider from '../Controller/DataProvider'
import { ObservationStation } from '../Model/ObservationStation';
import LocationMap from './LocationMap';

export default class DetailPage extends React.Component<IDetailPageProps, IDetailPageState> {

    //the corresponding observation station to this page
    observationStation: ObservationStation;

    constructor(props: IDetailPageProps) {
        super(props);
        //request the model data to the given observation station id
        this.observationStation = DataProvider.getObservationStation(this.props.id);
    }

    styles = {
        main_container: {
            backgroundColor: 'red',
            paddingTop: '20px',
        },
    }

    render() {
        return (
            <Grid container justify='center'>
                <Grid container justify='center' spacing={4} xl={8} lg={8} md={8} sm={12} xs={12} style={this.styles.main_container}>
                    {/* every component on the page is wrapped in a Grid, which determines its size */}
                    <Grid item xl={8} lg={8} md={8} sm={12} xs={12} >
                        <ObservationStationProfile observationStation={this.observationStation} />
                    </Grid>
                    <Hidden only={['sm', 'xs']}>
                        <Grid item xl={4} lg={4} md={4}>
                            <LocationMap position={this.observationStation.getPosition()} />
                        </Grid>
                    </Hidden>
                    {this.observationStation.getDiagrams().map(diagram => diagram.render())}
                </Grid>
                <Fragment>

                </Fragment>
            </Grid>
        );
    }
}

interface IDetailPageProps {
    id: string;
}

interface IDetailPageState { }