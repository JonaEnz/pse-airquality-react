import QueryBuilder from "../QueryBuilder";
import FrostFactory from "../FrostFactory";
import { Observation } from "../../../Model/Observation";
import ResultModelConverter from "../ResultModelConverter";
import { ObservationStation } from "../../../Model/ObservationStation";
import { Feature } from "../../../Model/Feature";

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
    //convert json to Observation object
    public convert(
        json: any,
        options: GetLatestObservationOptions
    ): Observation {
        let rl: ResultList;
        try {
            //apply pattern
            rl = json;
        } catch {
            throw new Error("Convertion Error: Unknown json pattern");
        }

        let observation: ObservationsEntity = rl.value[0].Observations[0];

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
    value: ValueEntity[];
}
export interface ValueEntity {
    Observations: ObservationsEntity[];
    "Observations@iot.nextLink"?: string;
    "@iot.id": string;
}
export interface ObservationsEntity {
    phenomenonTime: string;
    result: number;
}
