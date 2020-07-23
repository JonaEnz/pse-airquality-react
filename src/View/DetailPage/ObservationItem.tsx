import React from 'react';

import {
    Card,
    Grid,
    Avatar,
    Typography,
    CardContent,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons'

import { Color } from '../../Model/Color';
import { Observation } from '../../Model/Observation';
import { Feature } from '../../Model/Feature';


export default class ObservationItem extends React.Component<IObservationItemProps, IObservationItemState> {

    color: Color;
    observation: Observation;
    feature: Feature;

    styles = {
        feature_card: {
        },
        card_content: {
            padding: '10px',
        },
    };

    constructor(props: IObservationItemProps) {
        super(props);
        this.color = this.props.color;
        this.observation = this.props.observation;
        this.feature = this.observation.getFeature();
    }

    render() {
        return (
            <Card style={this.styles.feature_card} >
                <CardContent style={this.styles.card_content}>
                    <Grid container alignItems='center'>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Avatar style={{ backgroundColor: this.color.getHex() }}>
                                <FontAwesomeIcon icon={faThermometerHalf} />
                            </Avatar>
                        </Grid>
                        <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                            <Typography color='textSecondary'>{this.feature.getName()}</Typography>
                            <Typography variant='subtitle1'>{this.observation.getValue() + ' ' + this.feature.getUnitOfMeasurement()}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

interface IObservationItemProps {
    color: Color;
    observation: Observation;
}

interface IObservationItemState { }