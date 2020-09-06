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
import { shallow, mount, render } from 'enzyme';

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

let historyLineChart = new FeatureHistoryLineChartController(station, feature);

let language = Language.getInstance();

let props = {
    controller: new ComparisonToLastMonthPieChartController(station, feature)
}

let propslinechart = {
    controller: historyLineChart
}

let diagram = new Diagram(props);

let lineChart = new Diagram(propslinechart);

test("Diagram Chart renders", () => {
    let wrapped = shallow(diagram.renderChart());
    expect(wrapped.exists()).toBe(true);
});

test("DiagramConfiguration non-configurable", () => {
    expect(diagram.renderDiagramConfiguration()).toBe("");
});


test("DiagramConfiguration configurable", () => {
    expect(lineChart.renderDiagramConfiguration()).not.toBe("");
});

test("Diagram Chart renders", () => {
    let wrapped = shallow(diagram.render());
    expect(wrapped.exists()).toBe(true);
});

test("Diagram Chart renders", () => {
    let wrapped = shallow(lineChart.render());
    expect(wrapped.exists()).toBe(true);
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



test("show error message in DiagramFactory", () => {
    expect(() => {
        DiagramFactory.getDiagramController(
            "UndefinedPieChart",
            station,
            feature
        )
    }).toThrowError(`Diagram id: ${"UndefinedPieChart"}, is not supported`);
});

