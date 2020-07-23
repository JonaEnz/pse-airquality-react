import MapConfiguration from "./MapConfiguration";
import { Viewport } from "../Model/Viewport";
import { Scale } from "../Model/Scale";
import { MapPin } from "../Model/MapPin";
import { Polygon } from "../Model/Polygon";
import { Feature } from "../Model/Feature";
import { Color } from "../Model/Color";
import { ObservationStation } from "../Model/ObservationStation";
import { Position } from "../Model/Position";
import { Observation } from "../Model/Observation";

export default class TestConfiguration extends MapConfiguration {
    private feature: Feature;

    constructor(feature: Feature) {
        super();
        this.feature = feature;
    }

    async getPins(view: Viewport): Promise<MapPin[]> {
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

    private async getLatestObservationMock(
        station: ObservationStation,
        feature: Feature
    ): Promise<Observation> {
        return new Observation(
            station,
            feature,
            Math.random() * 50,
            new Date(Date.now())
        );
    }

    private async getPolygonColor(polygon: Polygon): Promise<Color> {
        var stations = polygon.getStations();
        var values = [];
        for (let index = 0; index < stations.length; index++) {
            var v = await this.getLatestObservationMock(
                stations[index],
                this.feature
            );
            values.push(v.getValue());
        }
        var avgValue = values.reduce((acc, c) => acc + c, 0) / values.length;
        return this.getScale().getColor(avgValue);
    }

    async getPolygons(view: Viewport): Promise<Polygon[]> {
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
