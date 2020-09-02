import React from "react";

import { Card, Grid, Avatar, Typography, Box } from "@material-ui/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconName } from "@fortawesome/fontawesome-svg-core";
import {
    faThermometerHalf,
    faSmog,
    faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Color } from "../../Model/Color";
import { Observation } from "../../Model/Observation";

import "./ObservationItem.css";

library.add(faThermometerHalf, faSmog, faTachometerAlt);

export default class ObservationItem extends React.Component<
    IObservationItemProps,
    IObservationItemState
    > {
    render() {
        return (
            <Card className="feature-card">
                <Box className="card-content">
                    <Grid container direction="row">
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            xl={2}
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                        >
                            <Avatar
                                style={{
                                    backgroundColor: this.props.color.getHex(),
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        this.props.observation
                                            .getFeature()
                                            .getIconName() as IconName
                                    }
                                />
                            </Avatar>
                        </Grid>
                        <Grid
                            container
                            direction="column"
                            xl={10}
                            lg={10}
                            md={10}
                            sm={10}
                            xs={10}
                        >
                            <Typography
                                className="centered-text"
                                color="textSecondary"
                            >
                                {this.props.observation.getFeature().getName()}
                            </Typography>
                            <Typography
                                className="centered-text"
                                variant="subtitle1"
                            >
                                {this.props.observation.getValue() +
                                    " " +
                                    this.props.observation
                                        .getFeature()
                                        .getUnitOfMeasurement()}
                            </Typography>
                            <Typography
                                align="right"
                                color="primary">
                                <a
                                    href={this.props.observation
                                        .getFeature()
                                        .getRelatedWeblink()}
                                    data-testid="featureWebLink"
                                >
                                    ?
                            </a>
                            </Typography>
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
