import { Feature } from "../../Model/Feature";
import { Observation } from "../../Model/Observation";
import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import { Scale } from "../../Model/Scale";
import { Color } from "../../Model/Color";
import FeatureProvider from "../FeatureProvider";
import { isNullOrUndefined } from "util";

export default class MockDataProvider {
    private static stations: { [key: string]: ObservationStation } = {};
    private static gOSsPromise: Promise<any>;

    private static randomColor(): Color {
        return new Color(
            Math.random() * 255,
            Math.random() * 255,
            Math.random() * 255
        );
    }
    static mockFeature(): Feature {
        var colors: { [key: number]: string } = {};
        for (let index = 0; index < 5; index++) {
            var c = this.randomColor().getHex();
            colors[Math.floor(Math.random() * 100)] = c;
        }
        var scale = new Scale(true, colors);
        return new Feature(
            "MockFeature",
            "nameId",
            "descId",
            scale,
            "weblink",
            100,
            "uoM",
            [],
            'icon',
        );
    }
    private static mockStation(center: Position): ObservationStation {
        var id = Math.floor(Math.random() * 10000).toString();
        var station = new ObservationStation(
            id,
            "mockName",
            "mockDesc",
            new Position(
                center.getLatitude() + 6 * Math.random() - 3,
                center.getLongitude() + 6 * Math.random() - 3
            ),
            []
        );
        MockDataProvider.stations[station.getId()] = station;
        return station;
    }
    private static mockObservations(center: Position): Observation[] {
        var count = Math.floor(Math.random() * 9) + 2;
        var obs = [];
        for (let i = 0; i < count; i++) {
            obs.push(
                new Observation(
                    this.mockStation(center),
                    this.mockFeature(),
                    Math.random() * 100,
                    new Date(Date.now())
                )
            );
        }
        return obs;
    }

    static async getLatestObservations(
        center: Position,
        radius: number,
        feature: Feature
    ): Promise<Observation[]> {
        var q =
            "https://api.smartaq.net/v1.0/Datastreams?" +
            "$select=@iot.id,name" +
            "&$filter=geo.distance(Thing/Locations/location,geography'POINT({lon} {lat})') lt {radius} and " +
            "overlaps(phenomenonTime,(now() sub duration'P1d')) and " +
            "ObservedProperty/@iot.id eq '{featureId}'" +
            "&$expand=Thing($select=name,@iot.id;$expand=Locations($select=location)," +
            "Datastreams($select=name)/ObservedProperty($select=@iot.id))," +
            "Observations($select=result,phenomenonTime;$filter=" +
            "phenomenonTime gt now() sub duration'P1D';$orderby=phenomenonTime desc;$top=1" +
            ")";
        q = q
            .replace(/{lon}/g, center.getLongitude().toString())
            .replace(/{lat}/g, center.getLatitude().toString())
            .replace(/{radius}/g, radius.toString())
            .replace(/{featureId}/g, feature.getId());
        var json = await (await fetch(q)).json();
        var result: IGetLatestObs[] = json.value;
        var observations: Observation[] = [];
        result.forEach((element) => {
            if (element.Observations.length !== 0) {
                var features: Feature[] = element.Thing.Datastreams.flatMap(
                    (d) => {
                        var f = FeatureProvider.getInstance().getFeature(
                            d.ObservedProperty["@iot.id"]
                        );
                        return f ?? [];
                    }
                );

                var o = new Observation(
                    new ObservationStation(
                        element.Thing["@iot.id"],
                        element.Thing.name,
                        element.Thing["@iot.id"] + "_desc",
                        new Position(
                            element.Thing.Locations[0].location.coordinates[1],
                            element.Thing.Locations[0].location.coordinates[0]
                        ),
                        features
                    ),
                    feature,
                    element.Observations[0].result ?? -1,
                    new Date(element.Observations[0].phenomenonTime)
                );
                observations.push(o);
                MockDataProvider.stations[
                    o.getObservationStation().getId()
                ] = o.getObservationStation();
            }
        });

        return observations;
    }

    static async getLatestObservation(
        station: ObservationStation,
        feature: Feature
    ): Promise<Observation> {
        if (feature.getId() === "MockFeature") {
            return this.mockObservations(station.getPosition())[0];
        }
        var q =
            "https://api.smartaq.net/v1.0/Datastreams?" +
            "$select=@iot.id" +
            "&$filter=Thing/@iot.id eq '{stationId}' and " +
            "ObservedProperty/@iot.id eq '{featureId}'" +
            "&$expand=Observations(" +
            "$top=1;$orderby=phenomenonTime desc;$select=result,phenomenonTime)";
        q = q
            .replace(/{featureId}/g, feature.getId())
            .replace(/{stationId}/g, station.getId());
        var res: IGetLatestObservation[] = (await (await fetch(q)).json())
            .value;
        //console.log(res);
        if (!res || res.length === 0) {
            return new Observation(station, feature, -1, new Date(Date.now()));
        }
        return new Observation(
            station,
            feature,
            res[0].Observations[0].result,
            new Date(res[0].Observations[0].phenomenonTime)
        );
    }

    static getObservations(
        station: ObservationStation,
        start: Date,
        end: Date,
        feature: Feature,
        frequency?: Date
    ): Observation[] {
        throw new Error("Not implemented");
    }

    static async getObservationStations(
        middle: Position,
        radius: number
    ): Promise<ObservationStation[]> {
        var query =
            "https://api.smartaq.net/v1.0/Things?" +
            "$filter=geo.distance(Locations/location,geography'POINT({lon} {lat})') " +
            "lt {radius} " +
            "and overlaps(Datastreams/phenomenonTime,(now() sub duration'P1d'))" +
            "&$expand=Locations($select=location)," +
            "Datastreams($select=name)/ObservedProperty($select=@iot.id)";
        console.log(
            query
                .replace(/{lon}/g, middle.getLongitude().toString())
                .replace(/{lat}/g, middle.getLatitude().toString())
                .replace(/{radius}/g, radius.toString())
        );
        MockDataProvider.gOSsPromise = fetch(
            query
                .replace(/{lon}/g, middle.getLongitude().toString())
                .replace(/{lat}/g, middle.getLatitude().toString())
                .replace(/{radius}/g, radius.toString())
        );
        var response = await (await MockDataProvider.gOSsPromise).json();
        var obs: ObservationStation[] = [];
        response.value.forEach((element: IGetObservationStations) => {
            var features: Feature[] = element.Datastreams.flatMap((d) => {
                var f = FeatureProvider.getInstance().getFeature(
                    d.ObservedProperty["@iot.id"]
                );
                if (!isNullOrUndefined(f)) {
                    return f as Feature;
                } else {
                    return [];
                }
            });
            var o = new ObservationStation(
                element["@iot.id"],
                element.name,
                element.description,
                new Position(
                    element.Locations[0].location.coordinates[1],
                    element.Locations[0].location.coordinates[0]
                ),
                features
            );
            obs.push(o);
            MockDataProvider.stations[o.getId()] = o;
        });
        return obs;
    }

    static getStation(id: string): ObservationStation {
        return MockDataProvider.stations[id];
    }
}

interface IGetObservationStations {
    "@iot.id": string;
    name: string;
    description: string;
    Locations: [
        {
            location: {
                coordinates: [number, number, number];
            };
        }
    ];
    Datastreams: {
        ObservedProperty: {
            "@iot.id": string;
        };
    }[];
}

interface IGetLatestObservation {
    Observations: [
        {
            phenomenonTime: string;
            result: number;
        }
    ];
}

interface IGetLatestObs {
    "@iot.id": string;
    Thing: {
        "@iot.id": string;
        Locations: [
            {
                location: {
                    coordinates: [number, number];
                };
            }
        ];
        name: string;
        Datastreams: {
            ObservedProperty: {
                "@iot.id": string;
            };
        }[];
    };
    Observations: {
        result: number;
        phenomenonTime: string;
    }[];
}
