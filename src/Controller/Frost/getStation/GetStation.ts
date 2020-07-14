import QueryBuilder from '../QueryBuilder';
import FrostFactory from '../FrostFactory';
import { ObservationStation } from '../../../Model/ObservationStation';
import ResultModelConverter from '../ResultModelConverter';
import { Position } from '../../../Model/Position';

export class GetStationFactory extends FrostFactory<ObservationStation> {
    constructor() {
        super(new GetStationConverter(), new GetStationBuilder());
    }
}

export class GetStationConverter implements ResultModelConverter<ObservationStation> {
    public convert(json: any): ObservationStation {
        //TODO


        return new ObservationStation("", "", "", new Position(0, 0), []);
    }
}


export class GetStationBuilder implements QueryBuilder {

    public getQuery(options: getStationOptions): string {
        return "Things('" + options.id + "')?$expand=Locations";
    }
}

export interface getStationOptions {
    id: string;
}