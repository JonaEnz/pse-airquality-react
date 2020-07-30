import React from 'react';

import {
    Card,
    Grid,
    Avatar,
    Typography,
    Box,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons'

import { Color } from '../../Model/Color';
import { Observation } from '../../Model/Observation';
import { Feature } from '../../Model/Feature';

import './ObservationItem.css';


export default class ObservationItem extends React.Component<IObservationItemProps, IObservationItemState> {
    constructor(props: IObservationItemProps) {
        super(props);
    }

    render() {
        return (
            <Card className='feature-card'>
                <Box className='card-content'>
                    <Grid container direction='row'>
                        <Grid container direction='column' justify='center' xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Avatar style={{ backgroundColor: this.props.color.getHex() }}>
                                <FontAwesomeIcon icon={faThermometerHalf} />
                            </Avatar>
                        </Grid>
                        <Grid container direction='column' xl={10} lg={10} md={10} sm={10} xs={10}>
                            <Typography className='centered-text' color='textSecondary'>{this.props.observation.getFeature().getName()}</Typography>
                            <Typography className='centered-text' variant='subtitle1'>{this.props.observation.getValue() + ' ' + this.props.observation.getFeature().getUnitOfMeasurement()}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        );
    }
}

interface IObservationItemProps {
    color: Color;
    observation: Observation;
}

interface IObservationItemState { }