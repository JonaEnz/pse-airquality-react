import QueryBuilder from '../QueryBuilder';
import FrostFactory from '../FrostFactory';
import { Observation } from '../../../Model/Observation';
import ResultModelConverter from '../ResultModelConverter';
import { Position } from '../../../Model/Position';
import { ObservationStation } from '../../../Model/ObservationStation';
import { Feature } from '../../../Model/Feature';

export class GetObservationsFactory extends FrostFactory<Observation[]> {
    constructor() {
        super(new GetObservationsConverter(), new GetObservationsBuilder());
    }
}

export class GetObservationsConverter implements ResultModelConverter<Observation[]> {
    public convert(json: any): Observation[] {
        return [];
    }
}


export class GetObservationsBuilder implements QueryBuilder {

    public getQuery(options: GetObservationsOptions): string {
        return "";
    }
}

export interface GetObservationsOptions {
    station: ObservationStation;
    feature: Feature;
    start: Date;
    end: Date;
}
