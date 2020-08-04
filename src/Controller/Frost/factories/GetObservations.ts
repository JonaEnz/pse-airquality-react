import QueryBuilder from "../QueryBuilder";
import FrostFactory from "../FrostFactory";
import { Observation } from "../../../Model/Observation";
import ResultModelConverter from "../ResultModelConverter";
import { ObservationStation } from "../../../Model/ObservationStation";
import { Feature } from "../../../Model/Feature";

export class GetObservationsFactory extends FrostFactory<Observation[]> {
    constructor() {
        super(new GetObservationsConverter(), new GetObservationsBuilder());
    }
}

export class GetObservationsConverter
    implements ResultModelConverter<Observation[]> {
    public convert(json: any, options: GetObservationsOptions): Observation[] {
        let rl: ResultList;

        try {
            //convert json to template
            rl = json;
        } catch {
            throw new Error("Convertion Error: unknown json template");
        }

        let observations: Observation[] = [];

        rl.value.forEach((stream) => {
            stream.Observations.forEach((obs) => {
                observations.push(
                    new Observation(
                        options.station,
                        options.feature,
                        obs.result,
                        new Date(obs.phenomenonTime)
                    )
                );
            });
        });

        return observations;
    }
}

export class GetObservationsBuilder implements QueryBuilder {
    public getQuery(options: GetObservationsOptions): string {
        return (
            "Datastreams?$select=@iot.id&$filter=Thing/@iot.id eq '" +
            options.station.getId() +
            "' and ObservedProperty/@iot.id eq '" +
            options.feature.getId() +
            "'&$expand=Observations($filter=overlaps(phenomenonTime, " +
            options.start.toDateString() +
            "/" +
            options.end.toDateString() +
            ");$orderby=phenomenonTime desc)"
        );
    }
}

export interface GetObservationsOptions {
    station: ObservationStation;
    feature: Feature;
    start: Date;
    end: Date;
}

export interface ResultList {
    value: ValueEntity[];
}
export interface ValueEntity {
    Observations: ObservationsEntity[];
    "@iot.id": string;
    "Observations@iot.nextLink"?: string;
}
export interface ObservationsEntity {
    phenomenonTime: string;
    resultTime: string;
    result: number;
    parameters: Parameters;
    "@iot.id": string;
    "@iot.selfLink": string;
}
export interface Parameters {
    "last calibration": string;
}
