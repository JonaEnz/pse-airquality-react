import MapConfiguration from "./MapConfiguration";
import { Viewport } from "../Model/Viewport";
import { Scale } from "../Model/Scale";
import { MapPin } from "../Model/MapPin";
import { Polygon } from "../Model/Polygon";
import { Feature } from "../Model/Feature";
import { Color } from "../Model/Color";
import { ObservationStation } from "../Model/ObservationStation";
import { Position } from "../Model/Position";

export default class TestConfiguration extends MapConfiguration {
    private feature: Feature;

    constructor(feature: Feature) {
        super();
        this.feature = feature;
    }

    getPins(view: Viewport): MapPin[] {
        return [
            new MapPin(
                view.getCenter().getString(),
                view.getCenter(),
                10,
                new Color(
                    Math.random() * 255,
                    Math.random() * 255,
                    Math.random() * 255
                )
            ),
        ];
    }

    getPolygons(view: Viewport): Polygon[] {
        return [
            new Polygon(
                [
                    new ObservationStation(
                        "1",
                        "1",
                        "",
                        new Position(49, 8.4),
                        []
                    ),
                    new ObservationStation(
                        "1",
                        "1",
                        "",
                        new Position(49, 8.5),
                        []
                    ),
                    new ObservationStation(
                        "1",
                        "1",
                        "",
                        new Position(50, 8.45),
                        []
                    ),
                ],
                new Color(0, 0, 0)
            ),
        ];
    }

    getScale(): Scale {
        return this.getFeatures()[0].getRelatedScale();
    }

    getFeatures(): Feature[] {
        return [this.feature];
    }

    setFeatures(features: Feature[]) {
        if (features.length === 0) {
            return; //no elements in array
        }
        this.feature = features[0];
    }
}
