import React from "react";
import { ObservationStation } from "../../Model/ObservationStation";
import { Map } from "./Map";
import { Feature } from "../../Model/Feature";
import { Viewport } from "../../Model/Viewport";
import { MapController } from "../../Controller/MapController";
import { MapPin } from "../../Model/MapPin";
import { Polygon } from "../../Model/Polygon";
import { Position } from "../../Model/Position";
import { Observation } from "../../Model/Observation";
import FeatureSelect from "./FeatureSelect";
import Search from "./Search";
import Legend from "./Legend";
import { Box, Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = (theme: Theme) => ({});

interface State {
    selectedStation: ObservationStation | null;
    lastObservation: Observation | null;
    pins: MapPin[];
    polygons: Polygon[];
    viewport: Viewport;
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
            lastObservation: null,
            viewport: this.mapController.getViewport(),
            pins: [],
            polygons: [],
        };
        this.update();
    }

    selectObservation(observation: Observation) {
        this.setState({
            selectedStation: observation.getObservationStation(),
            lastObservation: observation,
        });
    }

    update() {
        var pinPromise = this.mapController.getPins();
        var polyPromsie = this.mapController.getPolygons();
        Promise.all([pinPromise, polyPromsie]).then((pinPoly) => {
            this.setState({
                pins: pinPoly[0],
                polygons: pinPoly[1],
            });
        });
    }

    getValueAt(position: Position, feature: Feature): number {
        throw Error("Not implemented.");
    }

    onViewportChange(viewport: Viewport) {
        this.mapController.handleViewportChange(viewport);
        //Update Page
        this.setState({
            viewport: viewport,
        });
        this.update();
    }

    onStationSelected(pin: MapPin) {
        this.mapController.handlePopup(pin).then((o) => {
            this.selectObservation(o); // set Observation (and station) for Popup
        });
    }

    onSearch(term: string) {
        this.mapController.search(term);
        this.setState({ selectedStation: this.state.selectedStation });
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
            <Box>
                <Search
                    onSearch={(term) => this.onSearch(term)}
                    updatePosition={(pos) => {
                        var view = this.state.viewport;
                        view.setCenter(pos);
                        this.onViewportChange(view);
                    }}
                />
                <Map
                    viewport={this.state.viewport}
                    onViewportChange={(viewport) => {
                        this.onViewportChange(viewport);
                    }}
                    handlePopup={(pin) => this.onStationSelected(pin)}
                    pins={this.state.pins}
                    polygons={this.state.polygons}
                    lastObservation={this.state.lastObservation}
                />
                <FeatureSelect
                    onConfigurationChange={(conf) => {
                        this.mapController.onConfigurationChange(conf);
                        this.update();
                    }}
                />
                <Box
                    zIndex={1000}
                    style={{ position: "absolute", bottom: "7%", right: "5%" }}
                >
                    <Legend
                        min={min}
                        max={max}
                        scale={this.mapController.getScale()}
                    />
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(MapPage);
