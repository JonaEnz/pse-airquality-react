import { Viewport } from "../../Model/Viewport";
import { Position } from "../../Model/Position";
import { Observation } from "../../Model/Observation";
import { Feature } from "../../Model/Feature";
import { Scale } from "../../Model/Scale";
import { Polygon } from "../../Model/Polygon";
import MapConfiguration from "./MapConfiguration";
import MapConfigurationMemory from "../Storage/MapConfigurationMemory";
import StationConfiguration from "./StationConfiguration";
import FeatureProvider from "../FeatureProvider";
import { MapPin } from "../../Model/MapPin";
import NearConfiguration from "./NearConfiguration";
import PolygonConfiguration from "./PolygonConfiguration";
import DataProvider from "../Frost/DataProvider";

export class MapController {
    private config: MapConfiguration;
    private viewport: Viewport;

    private DEFAULT_POSITION: Position = new Position(49, 8.4); //Karlsruhe
    private DEFAULT_ZOOM: number = 5;

    constructor(useMemory: boolean = true) {
        if (useMemory) {
            var mcm = MapConfigurationMemory.load();
            this.config = mcm[0];
            this.viewport = mcm[1];
        } else {
            // Default viewport
            this.viewport = new Viewport(
                this.DEFAULT_POSITION,
                this.DEFAULT_ZOOM
            );
            this.config = new StationConfiguration(
                // Default configuration
                FeatureProvider.getInstance().getFeature(
                    "saqn:op:mcpm2p5"
                ) as Feature
            );
        }
        if (this.config.getFeatures().length === 0) {
            throw Error("Invalid MapConfiguration");
        }
    }

    // Called when a pin on the map is clicked, gets information from server
    async handlePopup(pin: MapPin): Promise<Observation> {
        var station = await DataProvider.getStation(pin.getId());
        return DataProvider.getLatestObservation(
            station,
            this.config.getFeatures()[0]
        );
    }

    // Store configuration and viewport in local storage
    private save() {
        MapConfigurationMemory.save(this.config, this.viewport);
    }

    // Current configuration id and feature id
    getFeatureSelectConf(): { conf: string; feature: string } {
        var f = this.config.getFeatures()[0].getId();
        var c = this.config.getId();
        return { conf: c, feature: f };
    }

    // Current viewport
    getViewport(): Viewport {
        return this.viewport;
    }

    // Called if the viewport has changed significantly
    handleViewportChange(viewport: Viewport) {
        if (viewport.getZoom() < 5) {
            viewport = new Viewport(viewport.getCenter(), 5);
        }
        this.viewport = viewport;
        this.save();
    }

    // Pins for leaflet map
    async getPins(): Promise<MapPin[]> {
        return this.config.getPins(this.viewport);
    }

    // Polygons to be drawn
    async getPolygons(): Promise<Polygon[]> {
        return this.config.getPolygons(this.viewport);
    }

    // The leaflet scale of the map
    getScale(): Scale {
        return this.config.getScale();
    }

    getSelectedFeature(): Feature {
        return this.config.getFeatures()[0];
    }

    // Switch to configuration with different feature
    changeFeature(feature: Feature) {
        switch (this.config.getId()) {
            case "StationConfiguration":
                this.config = new StationConfiguration(feature);
                break;
            case "NearConfiguration":
                this.config = new NearConfiguration(feature);
                break;
            case "PolygonConfiguration":
                this.config = new PolygonConfiguration(feature);
                break;

            default:
                throw new Error(
                    "Current configuration has invalid id: " +
                        this.config.getId()
                );
        }
    }

    // Called when user changes configuration
    onConfigurationChange(conf: MapConfiguration) {
        this.config = conf;
        this.save();
    }

    // Get Position from search term using the nominatim API
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

    // Set new position
    updateCurrentPosition(position: Position) {
        this.viewport.setCenter(position);
        this.save();
    }
}
