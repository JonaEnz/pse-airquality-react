/* This class is not used, thus commented.
import QueryBuilder from "../QueryBuilder";
import FrostFactory from "../FrostFactory";
import { Observation } from "../../../Model/Observation";
import ResultModelConverter from "../ResultModelConverter";
import { Position } from "../../../Model/Position";
import { ObservationStation } from "../../../Model/ObservationStation";
import { Feature } from "../../../Model/Feature";
import FeatureProvider from "../../FeatureProvider";

export class GetLatestObservationsFactory extends FrostFactory<Observation[]> {
    constructor() {
        super(
            new GetLatestObservationsConverter(),
            new GetLatestObservationsBuilder()
        );
    }
}

export class GetLatestObservationsConverter
    implements ResultModelConverter<Observation[]> {
    public convert(
        json: ResultList,
        options: GetLatestObservationsOptions
    ): Observation[] {
        let observations: Observation[] = [];
        if (json.value === null || json.value === undefined) {
            throw new Error("Cannot parse response of server");
        }

        json.value.forEach((stream) => {
            try {
                let thing: Thing = stream.Thing;
                if (thing.Locations === null || thing.Locations === undefined) {
                    return;
                }
                if (
                    thing.Locations[0].location.coordinates === null ||
                    thing.Locations[0].location.coordinates === undefined
                ) {
                    return;
                }
                let pos: Position = new Position(
                    thing.Locations[0].location.coordinates[1],
                    thing.Locations[0].location.coordinates[0]
                );

                let features: Feature[] = [];

                if (
                    thing.Datastreams === null ||
                    thing.Datastreams === undefined
                ) {
                    return;
                }

                let fp: FeatureProvider = FeatureProvider.getInstance();

                thing.Datastreams.forEach((dastream) => {
                    let feat: Feature | undefined = fp.getFeature(
                        dastream.ObservedProperty["@iot.id"]
                    );
                    if (feat !== undefined) {
                        features.push(feat);
                    }
                });

                let sta: ObservationStation = new ObservationStation(
                    thing["@iot.id"],
                    thing.name,
                    thing.description,
                    pos,
                    features
                );

                if (
                    stream.Observations === null ||
                    stream.Observations === undefined
                ) {
                    return;
                }
                if (stream.Observations[0] === null || stream.Observations[0] === undefined) {
                    return;
                }
                observations.push(
                    new Observation(
                        sta,
                        options.feature,
                        stream.Observations[0].result,
                        new Date(stream.Observations[0].phenomenonTime)
                    )
                );
            } catch (e) { }
        });

        return observations;
    }
}

export class GetLatestObservationsBuilder implements QueryBuilder {
    public getQuery(options: GetLatestObservationsOptions): string {
        return (
            "Datastreams?$select=@iot.id,name&$filter=geo.distance(Thing/Locations/location,geography'POINT(" +
            options.center.getLongitude() +
            " " +
            options.center.getLatitude() +
            ")') lt " +
            options.radius +
            " and overlaps(phenomenonTime,(now() sub duration'P1d')) and ObservedProperty/@iot.id eq '" +
            options.feature.getId() +
            "'&$expand=Thing($select=name,description,@iot.id;$expand=Locations($select=location),Datastreams($select=name)/ObservedProperty($select=@iot.id)),Observations($select=result,phenomenonTime;$filter=phenomenonTime gt now() sub duration'P1D';$orderby=phenomenonTime desc;$top=1)"
        );
    }
}

export interface GetLatestObservationsOptions {
    center: Position;
    radius: number;
    feature: Feature;
}

interface ResultList {
    value?: ValueEntity[] | null;
}
interface ValueEntity {
    name: string;
    Thing: Thing;
    Observations?: (ObservationsEntity | null)[] | null;
    "@iot.id": string;
    "Observations@iot.nextLink"?: string | null;
}
interface Thing {
    name: string;
    description: string;
    Datastreams?: DatastreamsEntity[] | null;
    Locations?: LocationsEntity[] | null;
    "@iot.id": string;
}
interface DatastreamsEntity {
    name: string;
    ObservedProperty: ObservedProperty;
}
interface ObservedProperty {
    "@iot.id": string;
}
interface LocationsEntity {
    location: Location;
}
interface Location {
    type: string;
    coordinates?: number[] | null;
}
interface ObservationsEntity {
    phenomenonTime: string;
    result: number;
}
*/