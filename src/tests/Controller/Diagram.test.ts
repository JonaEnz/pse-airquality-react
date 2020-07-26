
import { FeatureHistoryLineChartController } from "../../Controller/DiagramController/FeatureHistoryLineChartController";
import { ComparisonToLastYearPieChartController } from "../../Controller/DiagramController/ComparisonToLastYearPieChartController";
import { YearComparisonLineChartController } from "../../Controller/DiagramController/YearComparisonLineChartController";
import DiagramFactory from "../../Controller/DiagramController/DiagramFactory";
import { ChartType } from "../../Controller/DiagramController/DiagramController";
import { Feature } from "../../Model/Feature";
import { ObservationStation } from "../../Model/ObservationStation";
import { Scale } from "../../Model/Scale";
import { Position } from "../../Model/Position";


var feature = new Feature(
    "1",
    "testFeature",
    "id",
    new Scale(false, {
        10: "#000000",
        30: "#AABBCC",
        20: "#AAFFAA",
        999: "#BB00FF",
    }),
    "weblink",
    100,
    "degree",
    ["1", "2"],
    "iconnName"
);

var station = new ObservationStation("0001", "Chicago", "placeholder", new Position(0, 0), [feature]);

var historyChart = new FeatureHistoryLineChartController(station, feature);

var ComparisonToLastYearPieChart = new ComparisonToLastYearPieChartController(station, feature);

var yearComparisonChart = new YearComparisonLineChartController(station, feature);

test("getChartType() linechart", () => {
    expect(historyChart.getChartType()).toBe(ChartType.LINE_CHART);
});

test("isConfigurable() linechart", () => {
    expect(historyChart.isConfigurable()).toBe(true);
});

test("getDefaultConfigurationOption() linechart", () => {
    expect(historyChart.getDefaultConfigurationOption()).toBe("last_24_hours");
});

test("getConfigurationOptions() linechart", () => {
    expect(historyChart.getConfigurationOptions()).toBe(['last_24_hours', 'last_7_days', 'last_31_days', 'last_year'])
});

test("getChartType() piechart", () => {
    expect(ComparisonToLastYearPieChart.getChartType()).toBe(ChartType.PIE_CHART);
});

test("isConfigurable() piechart", () => {
    expect(ComparisonToLastYearPieChart.isConfigurable()).toBe(false);
});

test("getConfigurationOptions() piechart", () => {
    expect(ComparisonToLastYearPieChart.getConfigurationOptions()).toBe(['default_configuration'])
});

test("getDefaultConfigurationOption() piechart", () => {
    expect(ComparisonToLastYearPieChart.getDefaultConfigurationOption()).toBe("default_configuration");
});

test("getGraphicsOptions() yearcomparisonChart", () => {
    expect(yearComparisonChart.getGraphicsOptions()).toEqual({
        hAxis: {
            format: 'MMM',
            gridlines: { count: 6 }
        },
    });
    test("create Diagram in  Diagram Factory", () => {
        expect(DiagramFactory.getDiagramController('YearComparisonLineChart', station, feature)).toEqual(new YearComparisonLineChartController(station, feature))
    });

    test("show error message in DiagramFactory", () => {
        expect(DiagramFactory.getDiagramController('UndefinedPieChart', station, feature)).toThrowError();
    })


