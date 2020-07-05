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

interface State {
  selectedStation: ObservationStation | null;
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
      pins: [
        new MapPin("pin1", new Position(49, 8.5), 10, new Color(255, 0, 0)),
      ],
      polygons: [],
    };
    this.mapController = new MapController();
  }

  selectStation(station: ObservationStation) {
    this.setState({ selectedStation: station });
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
    var station = this.mapController.handlePopup(pin);
    this.selectStation(station); // set Station for Popup
  }

  render() {
    return (
      <Map
        onViewportChange={() => {}}
        handlePopup={() => {}}
        pins={this.state.pins}
        polygons={this.state.polygons}
      />
    );
  }
}
