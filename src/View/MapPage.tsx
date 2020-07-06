import React from "react";
import { ObservationStation } from "../Model/ObservationStation";
import { Map } from "./Map";
import { Feature } from "../Model/Feature";
import { Viewport } from "../Model/Viewport";
import { MapController } from "../Controller/MapController";
import { MapPin } from "../Model/MapPin";
import { Polygon } from "../Model/Polygon";
import { Position } from "../Model/Position";
import { Color } from "../Model/Color";
import { Observation } from "../Model/Observation";
import FeatureSelect from "./FeatureSelect";
import Search from "./Search";

interface State {
  selectedStation: ObservationStation | null;
  lastObservation: Observation | null;
  pins: MapPin[];
  polygons: Polygon[];
}

interface Props {}

export class MapPage extends React.Component<Props, State> {
  mapController: MapController;

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedStation: null,
      lastObservation: null,
      pins: [
        new MapPin("pin1", new Position(49, 8.5), 10, new Color(255, 0, 0)),
      ],
      polygons: [],
    };
    this.mapController = new MapController();
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
    this.setState({ selectedStation: this.state.selectedStation });
  }

  onStationSelected(pin: MapPin) {
    var observation = this.mapController.handlePopup(pin);
    this.selectObservation(observation); // set Observation (and station) for Popup
  }

  render() {
    return (
      <div>
        <Search />
        <Map
          onViewportChange={() => {}}
          handlePopup={(pin) => this.onStationSelected(pin)}
          pins={this.state.pins}
          polygons={this.state.polygons}
          lastObservation={this.state.lastObservation}
        />
        <FeatureSelect />
      </div>
    );
  }
}
