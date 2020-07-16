import { Feature } from "../../Model/Feature";
import { Observation } from "../../Model/Observation";
import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import { Scale } from "../../Model/Scale";
import { Color } from "../../Model/Color";

export default class MockDataProvider {
    private static stations: { [key: string]: ObservationStation } = {};

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
            []
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

    static getLatestObservations(
        center: Position,
        radius: number,
        feature: Feature
    ): Observation[] {
        return this.mockObservations(center);
    }

    static getLatestObservation(
        station: ObservationStation,
        feature: Feature
    ): Observation {
        return new Observation(
            station,
            feature,
            Math.random() * 100,
            new Date(Date.now())
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
            "https://api.smartaq.net/v1.0/Things?$filter=geo.distance(Locations/location,geography'POINT({lon} {lat})') lt {radius} and overlaps(Datastreams/phenomenonTime,(now() sub duration'P1d'))&$expand=Locations($select=location)";
        console.log(
            query
                .replace(/{lon}/g, middle.getLongitude().toString())
                .replace(/{lat}/g, middle.getLatitude().toString())
                .replace(/{radius}/g, radius.toString())
        );
        var response = await (
            await fetch(
                query
                    .replace(/{lon}/g, middle.getLongitude().toString())
                    .replace(/{lat}/g, middle.getLatitude().toString())
                    .replace(/{radius}/g, radius.toString())
            )
        ).json();
        var obs: ObservationStation[] = [];
        response.value.forEach((element: IGetObservationStations) => {
            var o = new ObservationStation(
                element["@iot.id"],
                element.name,
                element.description,
                new Position(
                    element.Locations[0].location.coordinates[1],
                    element.Locations[0].location.coordinates[0]
                ),
                []
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
}