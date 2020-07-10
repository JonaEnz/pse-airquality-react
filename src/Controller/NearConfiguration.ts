import MapConfiguration from "./MapConfiguration";
import { Viewport } from "../Model/Viewport";
import { Scale } from "../Model/Scale";
import { MapPin } from "../Model/MapPin";
import { Polygon } from "../Model/Polygon";
import { Feature } from "../Model/Feature";
import MockDataProvider from "./FROST/MockDataProvider";
import { Observation } from "../Model/Observation";
import { ObservationStation } from "../Model/ObservationStation";
import { strict } from "assert";

export default class NearConfiguration extends MapConfiguration {
    private selectedFeature: Feature;
    private scale: Scale;

    constructor(feature: Feature) {
        super();
        this.selectedFeature = feature;
        this.scale = this.selectedFeature.getRelatedScale();
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
        for (let index = 0; index < 10; index++) {
            var key = Math.floor(min + (max - min) * (index / 10));
            var val = this.selectedFeature.getLimit() * (index / 10);
            sc[key] = this.selectedFeature
                .getRelatedScale()
                .getColor(val)
                .getHex();
        }
        return new Scale(true, sc);
    }

    getPins(view: Viewport): MapPin[] {
        var obs = MockDataProvider.getObservationStations(
            view.getCenter(),
            view.getZoom()
        );
        var observations = MockDataProvider.getLatestObservations(
            view.getCenter(),
            view.getZoom(),
            this.selectedFeature
        );

        this.scale = this.buildNearScale(observations);

        var pins: MapPin[] = [];
        obs.forEach((o) => {
            pins.push(this.buildMapPin(o, Math.floor(Math.random() * 100)));
        });
        return pins;
    }
    getPolygons(view: Viewport): Polygon[] {
        return [];
    }
    getScale(): Scale {
        return this.scale;
    }
    getFeatures(): Feature[] {
        return [this.selectedFeature];
    }
}
