import React from 'react';
import {
    Card,
} from '@material-ui/core';

import { ObservationStation } from '../Model/ObservationStation';

export default class ObservationStationProfile extends React.Component<IObservationStationProfileProps, IObservationStationProfileState> {

    constructor(props: IObservationStationProfileProps) {
        super(props);
    }

    render() {
        return (
            <Card>
                <h1>ObservationStationProfile</h1>
            </Card>
        );
    }
}

interface IObservationStationProfileProps {
    observationStation: ObservationStation;
}

interface IObservationStationProfileState { }

