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

    getPins(view: Viewport): MapPin[] {
        var obs = MockDataProvider.getObservationStations(view.getCenter(), 0);
        //var latestObs = MockDataProvider.getLatestObservations(view.getCenter(), view.getZoom(), this.selectedFeature);
        return obs.map((o) => this.buildMapPin(o, Math.random() * 100));
    }

    getPolygons(view: Viewport): Polygon[] {
        return [];
    }

    getScale(): Scale {
        return this.selectedFeature.getRelatedScale();
    }

    getFeatures(): Feature[] {
        return [this.selectedFeature];
    }
}
