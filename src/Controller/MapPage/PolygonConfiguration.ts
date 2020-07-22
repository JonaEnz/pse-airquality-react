import MapConfiguration from "../MapConfiguration";
import { Viewport } from "../../Model/Viewport";
import { Scale } from "../../Model/Scale";
import { Feature } from "../../Model/Feature";
import { MapPin } from "../../Model/MapPin";
import { Polygon } from "../../Model/Polygon";
import MockDataProvider from "../FROST/MockDataProvider";
//@ts-ignore
import Delaunay from "delaunay-triangulation";
import { Position } from "../../Model/Position";
import { Observation } from "../../Model/Observation";

export default class PolygonConfiguration extends MapConfiguration {
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
        var stations: {
            [key: string]: Observation;
        } = {};
        var vertices: Delaunay.Point[] = [];

        for (let index = 0; index < observations.length; index++) {
            stations[
                observations[index]
                    .getObservationStation()
                    .getPosition()
                    .getString()
            ] = observations[index];
        }

        var tris = Delaunay.triangulate(vertices);
        var polys: Polygon[] = [];
        tris.forEach((triangle: any) => {
            var s1 =
                stations[
                    new Position(triangle.p1.x, triangle.p1.y).getString()
                ];
            var s2 =
                stations[
                    new Position(triangle.p2.x, triangle.p2.y).getString()
                ];
            var s3 =
                stations[
                    new Position(triangle.p3.x, triangle.p3.y).getString()
                ];
            var avgValue = (s1.getValue() + s2.getValue() + s3.getValue()) / 3;
            polys.push(
                new Polygon(
                    [
                        s1.getObservationStation(),
                        s2.getObservationStation(),
                        s3.getObservationStation(),
                    ],
                    this.getScale().getColor(avgValue)
                )
            );
        });

        return polys;
    }

    getScale(): Scale {
        return this.selectedFeature.getRelatedScale();
    }

    getFeatures(): Feature[] {
        return [this.selectedFeature];
    }
}
