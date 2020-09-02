import { ComparisonToLastMonthPieChartController } from "../../../Controller/DiagramController/ComparisonToLastMonthPieChartController";
import { ObservationStation } from "../../../Model/ObservationStation";
import { Feature } from "../../../Model/Feature";
import { Scale } from "../../../Model/Scale";
import { Position } from "../../../Model/Position";
import { ChartType } from "../../../Controller/DiagramController/DiagramController";
import { notDeepEqual } from "assert";

let feature = new Feature(
    'test_feature_id',
    'test_feature_name_id',
    'test_feature_description_id',
    new Scale(true, {}),
    'test_feature_related_weblink',
    100,
    'test_feature_unit_of_measurement',
    [],
    'test_feature_icon_name'
);
let observationStation = new ObservationStation(
    'test_observation_station_id',
    'test_observation_station_name',
    'test_observation_station_description',
    new Position(0, 0),
    [feature]
)
let controller = new ComparisonToLastMonthPieChartController(observationStation, feature);


//getID
test("should return ID", () => {
    expect(controller.getID()).toBe('ComparisonToLastMonthPieChart');
});

//setConfigurationOption
test('should not crash', () => {
    expect(() => controller.setConfigurationOption('default_configuration')).not.toThrow();
});
test('should throw error', () => {
    expect(() => controller.setConfigurationOption('false_confoguration_option')).toThrow();
});

//getChartType
test('should return chart type', () => {
    expect(controller.getChartType()).toBe(ChartType.PIE_CHART);
});

//getGraphicsOptions
test('should return google charts options', () => {
    expect(controller.getGraphicsOptions()).toMatchObject({});
});

//isConfigurable
test('should not be configurable', () => {
    expect(controller.isConfigurable()).toBeFalsy();
});

//getConfigurationOptions
test('should return configuration options', () => {
    expect(controller.getConfigurationOptions()).toStrictEqual(['default_configuration']);
});

//getCurrentConfigurationOption
test('should return current configuration options', () => {
    expect(controller.getCurrentConfigurationOption()).toStrictEqual('default_configuration');
});

//getData
test('should not crash', () => {
    expect(() => controller.getData('default_configuration')).not.toThrowError();
});
test('should return right data format', () => {
    expect(controller.getData('default_configuration')).toBeInstanceOf(Promise);
});