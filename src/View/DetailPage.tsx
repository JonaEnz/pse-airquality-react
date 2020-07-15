import React from 'react';
import { Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';

import MockDataProvider from '../Controller/MockDataProvider';

import { ObservationStation } from '../Model/ObservationStation';

import ObservationStationProfile from './ObservationStationProfile';
import LocationMap from './LocationMap';
import Diagram from './Diagrams/Diagram';

export default class DetailPage extends React.Component<IDetailPageProps, IDetailPageState> {

    //the concerning observation station of this page
    observationStation: ObservationStation;

    constructor(props: IDetailPageProps) {
        super(props);

        //get observation station by id
        this.observationStation = MockDataProvider.getStation(this.props.id);
    }

    //styles of this component
    styles = {
        main_container: {
            paddingTop: '20px',
        },
    }

    //return diagrams of this observation station
    renderDiagrams() {
        var diagramController = this.observationStation.getDiagramController();
        return (
            diagramController.map((controller) => (
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} >
                    <Diagram controller={controller} />
                </Grid>)
            ));
    }

    //render component
    render() {
        return (
            <Grid container justify='center'>
                <Grid container justify='center' spacing={4} xl={8} lg={8} md={8} sm={12} xs={12} style={this.styles.main_container}>
                    <Grid item xl={8} lg={8} md={8} sm={12} xs={12} >
                        <ObservationStationProfile observationStation={this.observationStation} />
                    </Grid>
                    <Hidden only={['sm', 'xs']}>
                        <Grid item xl={4} lg={4} md={4}>
                            <LocationMap position={this.observationStation.getPosition()} />
                        </Grid>
                    </Hidden>
                    {this.renderDiagrams()}
                </Grid>
            </Grid>
        );
    }
}

interface IDetailPageProps {
    id: string;
}

interface IDetailPageState { }