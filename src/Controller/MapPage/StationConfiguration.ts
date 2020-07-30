import MapConfiguration from "./MapConfiguration";
import { Viewport } from "../../Model/Viewport";
import { Scale } from "../../Model/Scale";
import { Polygon } from "../../Model/Polygon";
import { MapPin } from "../../Model/MapPin";
import { Feature } from "../../Model/Feature";
import DataProvider from "../Frost/DataProvider";
import { ObservationStation } from "../../Model/ObservationStation";
import { Observation } from "../../Model/Observation";

const ID = "StationConfiguration";

export default class StationConfiguration extends MapConfiguration {
    getId(): string {
        return ID;
    }
    private selectedFeature: Feature;

    constructor(feature: Feature) {
        super();
        this.selectedFeature = feature;
    }

    async getPins(view: Viewport): Promise<MapPin[]> {
        var latestObs: Observation[] = await DataProvider.getLatestObservations(
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
