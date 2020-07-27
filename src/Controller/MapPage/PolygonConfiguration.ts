import MapConfiguration from "./MapConfiguration";
import { Viewport } from "../../Model/Viewport";
import { Scale } from "../../Model/Scale";
import { Feature } from "../../Model/Feature";
import { MapPin } from "../../Model/MapPin";
import { Polygon } from "../../Model/Polygon";
import MockDataProvider from "../FROST/MockDataProvider";
import { Observation } from "../../Model/Observation";
import Delaunator from "delaunator";

const ID = "PolygonConfiguration";
export default class PolygonConfiguration extends MapConfiguration {
    getId(): string {
        return ID;
    }
    private selectedFeature: Feature;

    constructor(feature: Feature) {
        super();
        this.selectedFeature = feature;
    }

    async getPins(view: Viewport): Promise<MapPin[]> {
        return [];
    }

    async getPolygons(view: Viewport): Promise<Polygon[]> {
        var observations = await MockDataProvider.getLatestObservations(
            view.getCenter(),
            view.getRadius(),
            this.selectedFeature
        );
        var polys = this.triangulate(observations);
        return polys;
    }

    private triangulate(observations: Observation[]): Polygon[] {
        var points: [number, number][] = [];
        observations.forEach((o) =>
            points.push([
                o.getObservationStation().getPosition().getLatitude(),
                o.getObservationStation().getPosition().getLongitude(),
            ])
        );
        var delaunay = Delaunator.from(points);
        var output = [];
        var tri = delaunay.triangles;
        for (let i = 0; i < tri.length; i += 3) {
            var triStations = [
                observations[tri[i]].getObservationStation(),
                observations[tri[i + 1]].getObservationStation(),
                observations[tri[i + 2]].getObservationStation(),
            ];
            var val =
                (observations[tri[i]].getValue() +
                    observations[tri[i + 1]].getValue() +
                    observations[tri[i + 2]].getValue()) /
                3;
            output.push(
                new Polygon(
                    triStations,
                    this.selectedFeature.getRelatedScale().getColor(val)
                )
            );
        }
        return output;
    }

    getScale(): Scale {
        return this.selectedFeature.getRelatedScale();
    }

    getFeatures(): Feature[] {
        return [this.selectedFeature];
    }
}
