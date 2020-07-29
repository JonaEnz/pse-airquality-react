import QueryBuilder from '../QueryBuilder';
import FrostFactory from '../FrostFactory';
import { Observation } from '../../../Model/Observation';
import ResultModelConverter from '../ResultModelConverter';
import { Position } from '../../../Model/Position';
import { ObservationStation } from '../../../Model/ObservationStation';
import { Feature } from '../../../Model/Feature';

export class GetLatestObservationFactory extends FrostFactory<Observation> {
    constructor() {
        super(new GetLatestObservationConverter(), new GetLatestObservationBuilder());
    }
}

export class GetLatestObservationConverter implements ResultModelConverter<Observation> {
    public convert(json: any): Observation {
        return;
    }
}


export class GetLatestObservationBuilder implements QueryBuilder {

    public getQuery(options: GetLatestObservationOptions): string {
        return "Datastreams?$select=@iot.id&$filter=Thing/@iot.id eq '" + options.station.getId() + "' and ObservedProperty/@iot.id eq '" + options.feature.getId() + "'&$expand=Observations($top=1;$orderby=phenomenonTime desc;$select=result,phenomenonTime)";
    }
}

export interface GetLatestObservationOptions {
    station: ObservationStation;
    feature: Feature;
}
