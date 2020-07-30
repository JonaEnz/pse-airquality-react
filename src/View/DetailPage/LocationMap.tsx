import React from 'react';

import { Card } from '@material-ui/core';

import { Map, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';

import { Position } from '../../Model/Position';



export default class LocationMap extends React.Component<ILocationMapProps, ILocationMapState> {

    //zoom level of the map
    private static readonly ZOOM_LEVEL = 20;

    // server that provides tiles to render the map
    private static readonly TILE_SERVER = 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
    private static readonly TILE_SERVER_ATTRIBUTION = '&copy; <a href="https://www..org/copyright">OpenStreetMap</a>';

    // custom icon to show position
    private static readonly MARKER_ICON_PATH = './marker_icon.svg'; //path to the icon image
    private static readonly MARKER_ICON_SIZE = 48; //width and height of the marker icon

    static MARKER_ICON = new Leaflet.Icon({
        iconUrl: require('' + LocationMap.MARKER_ICON_PATH),
        iconSize: [LocationMap.MARKER_ICON_SIZE, LocationMap.MARKER_ICON_SIZE], // size of the icon
        iconAnchor: [LocationMap.MARKER_ICON_SIZE / 2, LocationMap.MARKER_ICON_SIZE], // point of the icon which will correspond to marker's location
    });

    constructor(props: ILocationMapProps) {
        super(props);
    }

    // custom css styles
    styles = {
        map: {
            height: '300px',
        },
    }

    //render component as JSX.Element
    render() {
        var position = new Leaflet.LatLng(this.props.position.getLatitude(), this.props.position.getLongitude());
        return (
            <Card>
                <Map
                    center={position} //center map to the required position
                    zoom={LocationMap.ZOOM_LEVEL} //set zoom
                    style={this.styles.map} //provide custom styles

                    // diable zooming via mouse and keyboard and disable dragging
                    scrollWheelZoom={false}
                    dragging={false}
                    keyboard={false}
                    doubleClickZoom={false}
                >
                    <TileLayer
                        url={LocationMap.TILE_SERVER}
                        attribution={LocationMap.TILE_SERVER_ATTRIBUTION}
                    />
                    <Marker
                        position={position}
                        icon={LocationMap.MARKER_ICON}
                    />
                </Map>
            </Card>
        );
    }
}

interface ILocationMapProps {
    position: Position;
}

interface ILocationMapState {
}