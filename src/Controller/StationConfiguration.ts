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
        var obs = await MockDataProvider.getObservationStations(
            view.getCenter(),
            view.getZoom()
        );
        //var latestObs = MockDataProvider.getLatestObservations(view.getCenter(), view.getZoom(), this.selectedFeature);
        return obs.map((o) => this.buildMapPin(o, Math.random() * 100));
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
