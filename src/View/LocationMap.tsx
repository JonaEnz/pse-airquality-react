import React from 'react';
import { Card, createStyles, WithStyles } from '@material-ui/core';

import { Position } from '../Model/Position';

export default class LocationMap extends React.Component<ILocationMapProps, ILocationMapState> {

    constructor(props: ILocationMapProps) {
        super(props);
    }

    render() {
        return (
            <Card>
                <h1>LocationMap</h1>
            </Card>
        );
    }
}

interface ILocationMapProps {
    position: Position;
}

interface ILocationMapState { }