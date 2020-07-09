import React from "react";
import { ObservationStation } from "../../Model/ObservationStation";
import { Map } from "./Map";
import { Feature } from "../../Model/Feature";
import { Viewport } from "../../Model/Viewport";
import { MapController } from "../../Controller/MapController";
import { MapPin } from "../../Model/MapPin";
import { Polygon } from "../../Model/Polygon";
import { Position } from "../../Model/Position";
import { Color } from "../../Model/Color";
import { Observation } from "../../Model/Observation";
import FeatureSelect from "./FeatureSelect";
import Search from "./Search";
import Legend from "./Legend";
import { Scale } from "../../Model/Scale";
import { Box, Theme } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import FeatureInfo from "./FeatureInfo";

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

class MapPage extends React.Component<Props, State> {
    mapController: MapController;

    constructor(props: Props) {
        super(props);
        this.mapController = new MapController();
        this.state = {
            selectedStation: null,
            lastObservation: null,
            pins: this.mapController.getPins(),
            polygons: this.mapController.getPolygons(),
            viewport: this.mapController.getViewport(),
        };
    }

    selectObservation(observation: Observation) {
        this.setState({
            selectedStation: observation.getObservationStation(),
            lastObservation: observation,
        });
    }

    getValueAt(position: Position, feature: Feature): number {
        throw Error("Not implemented.");
    }

    onViewportChange(viewport: Viewport) {
        this.mapController.handleViewportChange(viewport);
        //Update Page
        this.setState({ viewport: viewport });
    }

    onStationSelected(pin: MapPin) {
        var observation = this.mapController.handlePopup(pin);
        this.selectObservation(observation); // set Observation (and station) for Popup
    }

    onSearch(term: string) {
        this.mapController.search(term);
        this.setState({ selectedStation: this.state.selectedStation });
    }

    render() {
        var min = Math.min.apply(
            Math,
            this.state.pins.map((p) => {
                return p.getValue();
            })
        );
        var max = Math.max.apply(
            Math,
            this.state.pins.map((p) => {
                return p.getValue();
            })
        );
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
                <FeatureSelect onConfigurationChange={() => {}} />
                <Box style={{ float: "right" }}>
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
