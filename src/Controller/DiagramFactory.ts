import Diagram from '../View/Diagram';
import { IDiagramProps } from '../View/Diagram';
import FeatureHistoryLineChart from '../View/FeatureHistoryLineChart';
import YearComparisonLineChart from '../View/YearComparisonLineChart';
import ComparisonToLastYearPieChart from '../View/ComparisonToLastYearPieChart';
import { ObservationStation } from '../Model/ObservationStation';
import { Feature } from '../Model/Feature';


export default class DiagramFactory {

    //Returns a diagram object of a type specified by the 'id' parameter
    static getDiagram(id: string, observationStation: ObservationStation, feature: Feature): Diagram {
        var diagram: Diagram;
        var props: IDiagramProps = {
            observationStation: observationStation,
            feature: feature,
        }

        switch (id) {
            case 'FeatureHistoryLineChart':
                diagram = new FeatureHistoryLineChart(props);
                break;
            case 'YearComparisonLineChart':
                diagram = new YearComparisonLineChart(props);
                break;
            case 'ComparisonToLastYearPieChart':
                diagram = new ComparisonToLastYearPieChart(props);
                break;
            default:
                throw new Error('Diagram type not supported!');
        }

        return diagram;
    }
}