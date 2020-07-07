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
import Legend from "./Legend";
import { Scale } from "../Model/Scale";

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
    this.mapController = new MapController();
    this.state = {
      selectedStation: null,
      lastObservation: null,
      pins: this.mapController.getPins(),
      polygons: this.mapController.getPolygons(),
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
    this.setState({ selectedStation: this.state.selectedStation });
  }

  onStationSelected(pin: MapPin) {
    var observation = this.mapController.handlePopup(pin);
    this.selectObservation(observation); // set Observation (and station) for Popup
  }

  onSearch(pos: Position) {
    //TODO: Imple
    this.state.pins.push(
      new MapPin("Suchergebnis", pos, 10, new Color(100, 100, 100))
    );
    this.setState({
      pins: this.state.pins,
    });
  }

  render() {
    return (
      <div>
        <Search onSearch={(pos) => this.onSearch(pos)} />
        <Map
          onViewportChange={(viewport) => {
            this.onViewportChange(viewport);
          }}
          handlePopup={(pin) => this.onStationSelected(pin)}
          pins={this.state.pins}
          polygons={this.state.polygons}
          lastObservation={this.state.lastObservation}
        />
        <FeatureSelect />
        <Legend
          min={1}
          max={20}
          scale={
            new Scale(false, { 0: "#000000", 5: "#FFFFFF", 10: "#ABCFAA" })
          }
        />
      </div>
    );
  }
}
