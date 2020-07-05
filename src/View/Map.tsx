import React from "react";
import { Viewport } from "../Model/Viewport";
import { MapPin } from "../Model/MapPin";
import { Polygon } from "../Model/Polygon";

import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { Position } from "../Model/Position";

interface State {
  center: Position;
  zoom: number;
}

interface Props {
  onViewportChange: (viewport: Viewport) => void;
  handlePopup: (pin: MapPin) => void;
  pins: MapPin[];
  polygons: Polygon[];
}

export class Map extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      center: new Position(49, 8.4),
      zoom: 8,
    };
  }
  render() {
    return (
      <div>
        <LeafletMap
          center={this.state.center.getCoordinates()}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LeafletMap>
      </div>
    );
  }
}
