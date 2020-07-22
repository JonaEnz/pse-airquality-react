import { ObservationStation } from '../../Model/ObservationStation';
import { Feature } from '../../Model/Feature';
import { FeatureHistoryLineChartController } from './FeatureHistoryLineChartController';
import { ComparisonToLastYearPieChartController } from './ComparisonToLastYearPieChartController';
import { YearComparisonLineChartController } from './YearComparisonLineChartController';
import IDiagramController from './DiagramController';

export default class DiagramFactory {
    private static readonly diagramMap = new Map<string, Function>([
        ['FeatureHistoryLineChart', (observationStation: ObservationStation, feature: Feature) => { return new FeatureHistoryLineChartController(observationStation, feature) }],
        ['ComparisonToLastYearPieChart', (observationStation: ObservationStation, feature: Feature) => { return new ComparisonToLastYearPieChartController(observationStation, feature) }],
        ['YearComparisonLineChart', (observationStation: ObservationStation, feature: Feature) => { return new YearComparisonLineChartController(observationStation, feature) }],
    ]);

    public static getDiagramController(id: string, observationStation: ObservationStation, feature: Feature): IDiagramController {
        if (DiagramFactory.diagramMap.has(id)) {
            var constructController = DiagramFactory.diagramMap.get(id) as Function;
            return constructController.call(DiagramFactory, observationStation, feature);
        } else {
            throw new Error(`Diagram id: ${id}, is not supported`);
        }
    }

}
