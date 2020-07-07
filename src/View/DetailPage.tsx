import React from 'react';
import Fragment from 'react';
import './DetailPage.css';
import { Grid } from '@material-ui/core';

import ObservationStationProfile from './ObservationStationProfile';
import DataProvider from '../Controller/DataProvider'
import { ObservationStation } from '../Model/ObservationStation';

export default class DetailPage extends React.Component<IDetailPageProps, IDetailPageState> {

    //the corresponding observation station to this page
    observationStation: ObservationStation;

    constructor(props: IDetailPageProps) {
        super(props);

        //request the model data to the given observation station id
        this.observationStation = DataProvider.getObservationStation(this.props.id);
    }

    render() {
        return (
            <Fragment>
                <Grid container spacing={4}>
                    <Grid item lg={3} sm={6} xl={3} xs={12} >
                        <ObservationStationProfile observationStation={} />
                    </Grid>
                </Grid>
            </Fragment>
        );
    }

}

interface IDetailPageProps {
    id: string;
}

interface IDetailPageState { }