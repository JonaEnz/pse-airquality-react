import MapConfiguration from "./MapConfiguration";
import { Viewport } from "../../Model/Viewport";
import { Scale } from "../../Model/Scale";
import { MapPin } from "../../Model/MapPin";
import { Polygon } from "../../Model/Polygon";
import { Feature } from "../../Model/Feature";
import { Observation } from "../../Model/Observation";
import { ObservationStation } from "../../Model/ObservationStation";
import DataProvider from "../FROST/DataProvider";

const SAMPLE_SCALE = 20;
const ID = "NearConfiguration";

export default class NearConfiguration extends MapConfiguration {
    private selectedFeature: Feature;
    private scale: Scale;

    constructor(feature: Feature) {
        super();
        this.selectedFeature = feature;
        this.scale = this.selectedFeature.getRelatedScale();
    }

    getId(): string {
        return ID;
    }

    buildMapPin(obs: ObservationStation, value: number): MapPin {
        return new MapPin(
            obs.getId(),
            obs.getPosition(),
            value,
            this.scale.getColor(value)
        );
    }

    private buildNearScale(observations: Observation[]): Scale {
        var min = Math.min.apply(
            Math,
            observations.map((p) => {
                return p.getValue();
            })
        );
        var max = Math.max.apply(
            Math,
            observations.map((p) => {
                return p.getValue();
            })
        );

        var sc: { [key: number]: string } = {};
        // Sample 10 times between 0 => min and limit of feature => max
        for (let index = 0; index < SAMPLE_SCALE; index++) {
            var key = Math.floor(min + (max - min) * (index / SAMPLE_SCALE));
            var val = this.selectedFeature.getLimit() * (index / SAMPLE_SCALE);
            sc[key] = this.selectedFeature
                .getRelatedScale()
                .getColor(val)
                .getHex();
        }
        return new Scale(true, sc);
    }

    async getPins(view: Viewport): Promise<MapPin[]> {
        var observations = await DataProvider.getLatestObservations(
            view.getCenter(),
            view.getZoom(),
            this.selectedFeature
        );

        this.scale = this.buildNearScale(observations);

        var pins: MapPin[] = [];
        observations.forEach((o) => {
            pins.push(
                this.buildMapPin(o.getObservationStation(), o.getValue())
            );
        });
        return pins;
    }

    async getPolygons(view: Viewport): Promise<Polygon[]> {
        return [];
    }
    getScale(): Scale {
        return this.scale;
    }
    getFeatures(): Feature[] {
        return [this.selectedFeature];
    }
}
