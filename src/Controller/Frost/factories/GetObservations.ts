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
    public convert(
        json: ResultList,
        options: GetObservationsOptions
    ): Observation[] {
        if (json.value === null || json.value === undefined) {
            throw new Error("Cannot parse response of server");
        }
        let observations: Observation[] = [];
        json.value.forEach((stream) => {
            if (
                stream.Observations === null ||
                stream.Observations === undefined
            ) {
                return;
            }
            stream.Observations.forEach((obs) => {
                if (obs !== null) {
                    observations.push(
                        new Observation(
                            options.station,
                            options.feature,
                            obs.result,
                            new Date(obs.phenomenonTime)
                        )
                    );
                }
            });
        });
        return observations;
    }
}

export class GetObservationsBuilder implements QueryBuilder {
    public getQuery(options: GetObservationsOptions): string {
        return "Datastreams?$select=@iot.id&$filter=Thing/@iot.id eq '" + options.station.getId() + "' and ObservedProperty/@iot.id eq '" + options.feature.getId() + "'&$expand=Observations($filter=overlaps(phenomenonTime, " + options.start.toDateString() + "/" + options.end.toDateString() + ");$orderby=phenomenonTime desc)";
    }
}

export interface GetObservationsOptions {
    station: ObservationStation;
    feature: Feature;
    start: Date;
    end: Date;
}

export interface ResultList {
    value?: ValueEntity[] | null;
}
export interface ValueEntity {
    Observations?: (ObservationsEntity | null)[] | null;
    "@iot.id": string;
    "Observations@iot.nextLink"?: string | null;
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
