import { ObservationStation } from '../Model/ObservationStation'
import { Feature } from '../Model/Feature';
import { Position } from '../Model/Position';
import { Scale } from '../Model/Scale';

export default class DataProvider {

    //todo: real implementation
    //returns a mock observation station
    static getObservationStation(id: string): ObservationStation {
        var position = new Position(48.366216, 10.886720);
        var scale = new Scale(false, { 0: "#EEC000", 5: "#90B000", 10: "#FFFF00" });
        var features = [
            new Feature('feat_1', 'feat_name_1', 'feat_desc_1', scale, 'feat_link_1', 60, 'feat_unit_1', ['1', '2', '3']),
            new Feature('feat_2', 'feat_name_2', 'feat_desc_2', scale, 'feat_link_2', 90, 'feat_unit_2', ['1', '2']),
            new Feature('feat_3', 'feat_name_3', 'feat_desc_3', scale, 'feat_link_3', 15, 'feat_unit_3', ['1'])
        ];
        var station = new ObservationStation(id, 'test_station', 'Dies ist eine Messstation, die zu Testzwecken existiert.', position, features);
        return station;
    }
}