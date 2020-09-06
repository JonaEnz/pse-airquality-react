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


test("create Diagram in  Diagram Factory", () => {
    expect(
        DiagramFactory.getDiagramController(
            "ComparisonToLastMonthPieChart",
            station,
            feature
        )
    ).toEqual(new ComparisonToLastMonthPieChartController(station, feature));
});



test("show error message in DiagramFactory", () => {
    expect(() => {
        DiagramFactory.getDiagramController(
            "UndefinedPieChart",
            station,
            feature
        )
    }).toThrowError(`Diagram id: ${"UndefinedPieChart"}, is not supported`);
});

