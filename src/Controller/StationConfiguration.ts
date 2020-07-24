import MapConfiguration from "./MapConfiguration";
import { Viewport } from "../Model/Viewport";
import { Scale } from "../Model/Scale";
import { Polygon } from "../Model/Polygon";
import { MapPin } from "../Model/MapPin";
import MockDataProvider from "./FROST/MockDataProvider";
import { Feature } from "../Model/Feature";

export default class StationConfiguration extends MapConfiguration {
    private selectedFeature: Feature;

    constructor(feature: Feature) {
        super();
        this.selectedFeature = feature;
    }

    async getPins(view: Viewport): Promise<MapPin[]> {
        var latestObs = await MockDataProvider.getLatestObservations(
            view.getCenter(),
            view.getZoom(),
            this.selectedFeature
        );
        return latestObs.map((o) =>
            this.buildMapPin(o.getObservationStation(), o.getValue())
        );
    }

    async getPolygons(view: Viewport): Promise<Polygon[]> {
        return [];
    }

    getScale(): Scale {
        return this.selectedFeature.getRelatedScale();
    }

    getFeatures(): Feature[] {
        return [this.selectedFeature];
    }
}
