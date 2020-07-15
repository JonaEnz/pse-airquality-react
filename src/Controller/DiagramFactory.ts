import Diagram, { IDiagramProps } from '../View/Diagrams/Diagram';
import { ObservationStation } from '../Model/ObservationStation';
import { Feature } from '../Model/Feature';
import FeatureHistoryLineChartController from './FeatureHistoryLineChartController';
import IDiagramController from './DiagramController';


export default class DiagramFactory {

    //Returns a diagram object of a type specified by the 'id' parameter
    static getDiagram(id: string, observationStation: ObservationStation, feature: Feature): Diagram {
        var controller: IDiagramController;

        switch (id) {
            case 'FeatureHistoryLineChart':
                controller = new FeatureHistoryLineChartController(observationStation, feature);
                break;
            /* case 'YearComparisonLineChart':
                controller = new FeatureHistoryLineChartController(observationStation, feature);
                break;
            case 'ComparisonToLastYearPieChart':
                controller = new FeatureHistoryLineChartController(observationStation, feature);
                break; */
            default:
                throw new Error('Diagram type not supported!');
        }

        var props: IDiagramProps = {
            controller: controller,
        }

        return new Diagram(props);
    }
}