import { ObservationStation } from '../Model/ObservationStation';
import { Feature } from '../Model/Feature';
import FeatureHistoryLineChartController from './FeatureHistoryLineChartController';
import IDiagramController from './DiagramController';


export default class DiagramFactory {

    //Returns a diagram object of a type specified by the 'id' parameter
    static getDiagramController(id: string, observationStation: ObservationStation, feature: Feature): IDiagramController {
        var props = {};
        return new FeatureHistoryLineChartController(observationStation, feature);
    }
}