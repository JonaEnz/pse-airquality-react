import { MapPin } from "../Model/MapPin";
import { ObservationStation } from "../Model/ObservationStation";
import { Viewport } from "../Model/Viewport";
import { Position } from "../Model/Position";
import { Observation } from "../Model/Observation";
import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";
import { Color } from "../Model/Color";
import { Polygon } from "../Model/Polygon";
import MapConfiguration from "./MapConfiguration";
import MapConfigurationMemory from "./Storage/MapConfigurationMemory";

export class MapController {
    private config: MapConfiguration;
    private viewport: Viewport;
    private selectedFeature: Feature;

    constructor() {
        var mcm = MapConfigurationMemory.load();
        this.config = mcm[0];
        this.viewport = mcm[1];
        this.selectedFeature = this.config.getFeatures()[0]; //TODO: Support more then one feature
        if (!this.selectedFeature) {
            throw Error("Bad Configuration");
        }
    }

    handlePopup(pin: MapPin): Observation {
        //TODO: Rework
        var station = new ObservationStation(
            pin.getId(),
            pin.getId(),
            "desc1",
            pin.getPosition(),
            []
        );
        return new Observation(
            station,
            this.selectedFeature,
            15,
            new Date(Date.now())
        );
    }

    private save() {
        MapConfigurationMemory.save(this.config, this.viewport);
    }

    handleViewportChange(viewport: Viewport) {
        this.viewport = viewport;
        this.save();
    }

    getPins(): MapPin[] {
        return this.config.getPins(this.viewport, this.selectedFeature);
    }

    getPolygons(): Polygon[] {
        return this.config.getPolygons(this.viewport, this.selectedFeature);
    }

    getScale(): Scale {
        return this.config.getScale();
    }

    changeFeature(feature: Feature) {
        this.selectedFeature = feature;
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
    }
}
