import React, { SyntheticEvent } from "react";
import { ObservationStation } from "../../Model/ObservationStation";
import { Map } from "./Map";
import { Feature } from "../../Model/Feature";
import { Viewport } from "../../Model/Viewport";
import { MapController } from "../../Controller/MapPage/MapController";
import { MapPin } from "../../Model/MapPin";
import { Polygon } from "../../Model/Polygon";
import { Position } from "../../Model/Position";
import { Observation } from "../../Model/Observation";
import FeatureSelect from "./FeatureSelect";
import Search from "./Search";
import Legend from "./Legend";
import { Box, Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Color } from "../../Model/Color";

import "./MapPage.css";

const styles = (theme: Theme) => ({});

interface State {
    selectedStation: ObservationStation | null;
    pins: MapPin[];
    polygons: Polygon[];
    viewport: Viewport;
    additionalPins: MapPin[];
}

interface Props {
    classes: any;
}

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;

class MapPage extends React.Component<Props, State> {
    mapController: MapController;

    constructor(props: Props) {
        super(props);
        this.mapController = new MapController();

        this.state = {
            selectedStation: null,
            viewport: this.mapController.getViewport(),
            pins: [],
            polygons: [],
            additionalPins: [],
        };
        this.update();
    }

    // Set station as source for the StationInfo Popup
    changePopupStation(station: ObservationStation) {
        this.setState({
            selectedStation: station,
        });
    }

    // Reload Pins and Polygons
    update() {
        var pinPromise = this.mapController.getPins();
        var polyPromise = this.mapController.getPolygons();
        Promise.all([pinPromise, polyPromise]).then((pinPoly) => {
            this.setState({
                pins: pinPoly[0],
                polygons: pinPoly[1],
            });
        });
    }

    getValueAt(position: Position, feature: Feature): number {
        // Get pins sorted by distance
        var sortedPins = this.state.pins.sort((a, b) => {
            return (
                a.getPosition().getDistance(position) -
                b.getPosition().getDistance(position)
            );
        });
        var dis = 0; //Distance of nearest station to position
        var disSum = 0;
        if (sortedPins.length !== 0) {
            dis = sortedPins[0].getPosition().getDistance(position);
        }
        var value = 0;
        for (let i = 0; i <= 2; i++) {
            //nearest 3 stations (if they exist)
            if (sortedPins.length > i) {
                var temp =
                    dis / sortedPins[i].getPosition().getDistance(position); //Inverse of distance in comparison to nearest station
                disSum += temp;
                value += sortedPins[i].getValue() * temp; //Value, nearest with weight 1.
            }
        }
        return value / (disSum === 0 ? 1 : disSum); //Catch division by zero (empty pin list)
    }

    onViewportChange(viewport: Viewport) {
        this.mapController.handleViewportChange(viewport);
        //Update Page
        this.setState({
            viewport: viewport,
        });
        this.update();
    }

    async onStationSelected(pin: MapPin): Promise<Observation> {
        if (this.state.additionalPins.some((p) => pin.getId() === p.getId())) {
            // Not a station, do nothing
            return new Promise(() => {
                return null;
            });
        }
        this.setState({ selectedStation: null });
        var promise = this.mapController.handlePopup(pin);
        promise.then((o) => this.changePopupStation(o.getObservationStation()));
        return promise;
    }

    onSearch(event: SyntheticEvent, term: string) {
        event.preventDefault();
        this.mapController.search(term).then(() => {
            this.setHomeMarker();
            this.update();
        });
    }

    setHomeMarker() {
        var mp = new MapPin(
            "icon-home-1",
            this.state.viewport.getCenter(),
            -1,
            new Color(0, 0, 0)
        );
        this.setState({
            additionalPins: [mp],
            pins: this.state.pins,
        });
    }

    getMin(): number {
        var min = Math.min.apply(
            Math,
            this.state.pins.map((p) => {
                return p.getValue();
            })
        );
        if (!isFinite(min)) {
            min = DEFAULT_MIN;
        }
        return min;
    }

    getMax(): number {
        var max = Math.max.apply(
            Math,
            this.state.pins.map((p) => {
                return p.getValue();
            })
        );
        if (!isFinite(max)) {
            max = DEFAULT_MAX;
        }
        return max;
    }

    render() {
        var min = this.getMin();
        var max = this.getMax();
        return (
            <Box className="map-page">
                <Box className="search">
                    <Search
                        onSearch={(event, term) => this.onSearch(event, term)}
                        updatePosition={(pos) => {
                            var view = this.state.viewport;
                            view.setCenter(pos);
                            this.setHomeMarker();
                            this.onViewportChange(view);
                        }}
                    />
                </Box>
                <Box className="map">
                    <Map
                        viewport={this.state.viewport}
                        onViewportChange={(viewport) => {
                            this.onViewportChange(viewport);
                        }}
                        handlePopup={(pin) => this.onStationSelected(pin)}
                        pins={this.state.pins.concat(this.state.additionalPins)}
                        polygons={this.state.polygons}
                    />
                </Box>
                <Box className="feature-select">
                    <FeatureSelect
                        onConfigurationChange={(conf) => {
                            this.mapController.onConfigurationChange(conf);
                            this.update();
                        }}
                        startConf={this.mapController.getFeatureSelectConf()}
                    />
                </Box>
                <Box className="legend">
                    <Legend
                        min={min}
                        max={max}
                        unit={this.mapController
                            .getSelectedFeature()
                            .getUnitOfMeasurement()}
                        scale={this.mapController.getScale()}
                    />
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(MapPage);
