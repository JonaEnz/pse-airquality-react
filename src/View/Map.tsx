import React from "react";
import { Viewport } from "../Model/Viewport";
import { MapPin } from "../Model/MapPin";
import { Polygon } from "../Model/Polygon";

import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Polygon as LeafletPolygon,
  Viewport as LeafletViewport,
  Popup,
} from "react-leaflet";
import { Position } from "../Model/Position";
import { StationInfo } from "./StationInfo";
import { ObservationStation } from "../Model/ObservationStation";
import { Observation } from "../Model/Observation";
require("leaflet-iconmaterial");
interface State {
  center: Position;
  zoom: number;
}

interface Props {
  onViewportChange: (viewport: Viewport) => void;
  handlePopup: (pin: MapPin) => void;
  pins: MapPin[];
  polygons: Polygon[];
  lastObservation: Observation | null;
}

export class Map extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      center: new Position(49, 8.4),
      zoom: 8,
    };
  }

  private getIconFromMapPin(pin: MapPin): L.Icon {
    // Custom icons with colors
    //TODO: Add warning if limit is reached?
    // @ts-ignore
    var busIcon = L.IconMaterial.icon({
      icon: "", // Name of Material icon
      iconColor: "", // Material icon color (could be rgba, hex, html name...)
      markerColor: pin.getColor().getHex(), // Marker fill color
      outlineColor: "black", // Marker outline color
      outlineWidth: 1, // Marker outline width
    });
    return busIcon;
  }

  private onViewportChange(viewport: LeafletViewport) {
    this.props.onViewportChange(this.viewportLeafletToModel(viewport));
  }

  private viewportLeafletToModel(viewport: LeafletViewport): Viewport {
    return new Viewport(
      new Position(viewport.center?.[0] ?? 0, viewport.center?.[1] ?? 0),
      viewport.zoom ?? 0
    );
  }

  render() {
    return (
      <div>
        <LeafletMap
          center={this.state.center.getCoordinates()}
          zoom={this.state.zoom}
          onViewportChange={(v) => this.onViewportChange(v)}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.props.pins.map((pin) => (
            <Marker
              position={pin.getPosition().getCoordinates()}
              icon={this.getIconFromMapPin(pin)}
            >
              <Popup onOpen={() => this.props.handlePopup(pin)}>
                {this.props.lastObservation ? (
                  <StationInfo lastObservation={this.props.lastObservation} />
                ) : (
                  <p>No station selected</p>
                )}
              </Popup>
            </Marker>
          ))}
          {/*
          {this.props.polygons.map((polygon) => (
            <LeafletPolygon positions={polygon}/>
          ))}
          */}
        </LeafletMap>
      </div>
    );
  }
}
