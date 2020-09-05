import { FeatureHistoryLineChartController } from "../../Controller/DiagramController/FeatureHistoryLineChartController";
import { ComparisonToLastMonthPieChartController } from "../../Controller/DiagramController/ComparisonToLastMonthPieChartController";
import DiagramFactory from "../../Controller/DiagramController/DiagramFactory";
import { ChartType } from "../../Controller/DiagramController/DiagramController";
import { Feature } from "../../Model/Feature";
import { ObservationStation } from "../../Model/ObservationStation";
import { Scale } from "../../Model/Scale";
import { Position } from "../../Model/Position";
import Language from "../../Controller/Storage/Language";
import Diagram from "../../View/DetailPage/Diagram";

let feature = new Feature(
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
    "iconName"
);


let station = new ObservationStation(
    "0001",
    "Chicago",
    "placeholder",
    new Position(0, 0),
    [feature]
);

let historyChart = new FeatureHistoryLineChartController(station, feature);

//let diagram = new Diagram(historyChart));

let ComparisonToLastYearPieChart = new ComparisonToLastMonthPieChartController(
    station,
    feature
);

let language = Language.getInstance();

test("getChartType() linechart", () => {
    expect(historyChart.getChartType()).toBe(ChartType.LINE_CHART);
});



test("getID historyLineChart", () => {
    expect(historyChart.getID()).toBe("FeatureHistoryLineChart");
});


test("isConfigurable() linechart", () => {
    expect(historyChart.isConfigurable()).toBe(true);
});

test("getDefaultConfigurationOption() linechart", () => {
    expect(historyChart.getCurrentConfigurationOption()).toStrictEqual(
        language.getText("last_24_hours")
    );
});

test("getConfigurationOptions() linechart", () => {
    expect(historyChart.getConfigurationOptions()).toStrictEqual([
        language.getText("last_24_hours"),
        language.getText("last_7_days"),
        language.getText("last_31_days"),
        language.getText("last_year"),
    ]);
});

test("getChartType() piechart", () => {
    expect(ComparisonToLastYearPieChart.getChartType()).toBe(
        ChartType.PIE_CHART
    );
});

test("isConfigurable() piechart", () => {
    expect(ComparisonToLastYearPieChart.isConfigurable()).toBe(false);
});

test("getConfigurationOptions() piechart", () => {
    expect(
        ComparisonToLastYearPieChart.getConfigurationOptions()
    ).toStrictEqual(["default_configuration"]);
});

test("getDefaultConfigurationOption() piechart", () => {
    expect(ComparisonToLastYearPieChart.getCurrentConfigurationOption()).toBe(
        "default_configuration"
    );
});

test("create Diagram in  Diagram Factory", () => {
    expect(
        DiagramFactory.getDiagramController(
            "ComparisonToLastMonthPieChart",
            station,
            feature
        )
    ).toEqual(new ComparisonToLastMonthPieChartController(station, feature));
});


/*
test("show error message in DiagramFactory", () => {
    expect(
        DiagramFactory.getDiagramController(
            "UndefinedPieChart",
            station,
            feature
        )
    ).toThrowError(`Diagram id: ${"UndefinedPieChart"}, is not supported`);
});
*/
