import QueryBuilder from "../QueryBuilder";
import FrostFactory from "../FrostFactory";
import { Observation } from "../../../Model/Observation";
import ResultModelConverter from "../ResultModelConverter";
import { Position } from "../../../Model/Position";
import { ObservationStation } from "../../../Model/ObservationStation";
import { Feature } from "../../../Model/Feature";
import { Scale } from "../../../Model/Scale";

export class GetLatestObservationFactory extends FrostFactory<Observation> {
    constructor() {
        super(
            new GetLatestObservationConverter(),
            new GetLatestObservationBuilder()
        );
    }
}

export class GetLatestObservationConverter
    implements ResultModelConverter<Observation> {
    public convert(
        json: ResultList,
        options: GetLatestObservationOptions
    ): Observation {
        if (json.value === null || json.value === undefined) {
            throw new Error("nö");
        }
        if (json.value[0] === null || json.value[0] === undefined) {
            throw new Error("nö");
        }
        if (
            json.value[0].Observations === null ||
            json.value[0].Observations === undefined
        ) {
            throw new Error("nö");
        }
        if (
            json.value[0].Observations[0] === null ||
            json.value[0].Observations[0] === undefined
        ) {
            throw new Error("nö");
        }

        let observation: ObservationsEntity = json.value[0].Observations[0];

        return new Observation(
            options.station,
            options.feature,
            observation.result,
            new Date(observation.phenomenonTime)
        );
    }
}

export class GetLatestObservationBuilder implements QueryBuilder {
    public getQuery(options: GetLatestObservationOptions): string {
        return (
            "Datastreams?$select=@iot.id&$filter=Thing/@iot.id eq '" +
            options.station.getId() +
            "' and ObservedProperty/@iot.id eq '" +
            options.feature.getId() +
            "'&$expand=Observations($top=1;$orderby=phenomenonTime desc;$select=result,phenomenonTime)"
        );
    }
}

export interface GetLatestObservationOptions {
    station: ObservationStation;
    feature: Feature;
}

export interface ResultList {
    value?: ValueEntity[] | null;
}
export interface ValueEntity {
    Observations?: ObservationsEntity[] | null;
    "Observations@iot.nextLink": string;
    "@iot.id": string;
}
export interface ObservationsEntity {
    phenomenonTime: string;
    result: number;
}
