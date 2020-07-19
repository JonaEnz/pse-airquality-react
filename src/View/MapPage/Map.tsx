import "./Map.css";
import React from "react";
import { Viewport } from "../../Model/Viewport";
import { MapPin } from "../../Model/MapPin";
import { Polygon } from "../../Model/Polygon";

import {
    Map as LeafletMap,
    TileLayer,
    Marker,
    Polygon as LeafletPolygon,
    Viewport as LeafletViewport,
    Popup,
} from "react-leaflet";
import { Position } from "../../Model/Position";
import { StationInfo } from "./StationInfo";
import { Observation } from "../../Model/Observation";
import { ObservationStation } from "../../Model/ObservationStation";
import Language from "../../Controller/Storage/Language";
require("leaflet-iconmaterial");
interface State {
    viewport: Viewport;
    lastObservation: Observation | null;
}

interface Props {
    onViewportChange: (viewport: Viewport) => void;
    handlePopup: (pin: MapPin) => Promise<Observation>;
    viewport: Viewport;
    pins: MapPin[];
    polygons: Polygon[];
}

export class Map extends React.Component<Props, State> {
    nextViewport: LeafletViewport | null;
    lock: boolean;
    constructor(props: Props) {
        super(props);
        this.lock = false;
        this.nextViewport = null;
        this.state = {
            viewport: this.props.viewport,
            lastObservation: null,
        };
    }

    private getIconFromMapPin(pin: MapPin): L.Icon {
        // Custom icons with colors
        //TODO: Add warning if limit is reached? (requires design change)
        // @ts-ignore
        var icon = L.IconMaterial.icon({
            icon: "", // Name of Material icon
            iconColor: "", // Material icon color (could be rgba, hex, html name...)
            markerColor: pin.getColor().getHex(), // Marker fill color
            outlineColor: "black", // Marker outline color
            outlineWidth: 1, // Marker outline width
        });
        return icon;
    }

    private onViewportChange(viewport: LeafletViewport) {
        this.nextViewport = viewport;
        if (!this.lock) {
            this.lock = true;
            setTimeout(
                () => this.updateViewport(this.nextViewport as LeafletViewport),
                300
            );
        }
    }

    private updateViewport(viewport: LeafletViewport) {
        var modelView = this.viewportLeafletToModel(viewport);
        this.props.onViewportChange(modelView);

        this.setState({ viewport: modelView });
        this.lock = false;
    }

    private viewportLeafletToModel(viewport: LeafletViewport): Viewport {
        return new Viewport(
            new Position(viewport.center?.[0] ?? 0, viewport.center?.[1] ?? 0),
            viewport.zoom ?? 5
        );
    }

    private async handlePopup(pin: MapPin) {
        var observation = await this.props.handlePopup(pin);
        this.setState({ lastObservation: observation });
    }

    private getPositionsFromPolygon(
        polygon: Polygon
    ): { lat: number; lng: number }[] {
        return polygon
            .getStations()
            .map((obsSt: ObservationStation) =>
                obsSt.getPosition().getCoordinates()
            );
    }

    render() {
        return (
            <div>
                <LeafletMap
                    center={this.state.viewport.getCenter().getCoordinates()}
                    zoom={this.state.viewport.getZoom()}
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
                            <Popup onOpen={() => this.handlePopup(pin)}>
                                {this.state.lastObservation ? (
                                    <StationInfo
                                        lastObservation={
                                            this.state.lastObservation
                                        }
                                    />
                                ) : (
                                    <p>
                                        {Language.getInstance().getText(
                                            "loading"
                                        )}
                                    </p>
                                )}
                            </Popup>
                        </Marker>
                    ))}
                    {this.props.polygons.map((polygon) => (
                        <LeafletPolygon
                            positions={this.getPositionsFromPolygon(polygon)}
                            color={polygon.getColor().getHex()}
                        />
                    ))}
                </LeafletMap>
            </div>
        );
    }
}
