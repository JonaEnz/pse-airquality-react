import { MapPin } from "../Model/MapPin";
import { Viewport } from "../Model/Viewport";
import { Position } from "../Model/Position";
import { Observation } from "../Model/Observation";
import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";
import { Polygon } from "../Model/Polygon";
import MapConfiguration from "./MapConfiguration";
import MapConfigurationMemory from "./Storage/MapConfigurationMemory";
import MockDataProvider from "./FROST/MockDataProvider";
import PolygonConfiguration from "./MapPage/PolygonConfiguration";

export class MapController {
    private config: MapConfiguration;
    private viewport: Viewport;

    private DEFAULT_POSITION: Position = new Position(49, 8.4);
    private DEFAULT_ZOOM: number = 5;

    constructor(useMemory: boolean = true) {
        if (useMemory) {
            var mcm = MapConfigurationMemory.load();
            this.config = mcm[0];
            this.viewport = mcm[1];
        } else {
            this.viewport = new Viewport(
                this.DEFAULT_POSITION,
                this.DEFAULT_ZOOM
            );
            this.config = new PolygonConfiguration(
                MockDataProvider.mockFeature()
            );
        }
        if (this.config.getFeatures().length === 0) {
            throw Error("Invalid MapConfiguration");
        }
    }

    async handlePopup(pin: MapPin): Promise<Observation> {
        var station = await MockDataProvider.getStation(pin.getId());
        return MockDataProvider.getLatestObservation(
            station,
            this.config.getFeatures()[0]
        );
    }

    private save() {
        MapConfigurationMemory.save(this.config, this.viewport);
    }

    getViewport(): Viewport {
        return this.viewport;
    }

    handleViewportChange(viewport: Viewport) {
        this.viewport = viewport;
        this.save();
    }

    async getPins(): Promise<MapPin[]> {
        return this.config.getPins(this.viewport);
    }

    async getPolygons(): Promise<Polygon[]> {
        return this.config.getPolygons(this.viewport);
    }

    getScale(): Scale {
        return this.config.getScale();
    }

    changeFeature(feature: Feature) {
        //TODO
    }

    onConfigurationChange(conf: MapConfiguration) {
        this.config = conf;
        this.save();
    }

    async search(searchTerm: string) {
        if (searchTerm.length === 0) {
            return; //No search possible
        }

        var response = await fetch(
            "https://nominatim.openstreetmap.org/search?format=json&q=" +
                encodeURIComponent(searchTerm)
        );
        var json = await response.json();
        if (json.length === 0) {
            return; //No location found
        }
        this.updateCurrentPosition(new Position(json[0].lat, json[0].lon));
    }

    updateCurrentPosition(position: Position) {
        this.viewport.setCenter(position);
        console.log(position);
    }
}
