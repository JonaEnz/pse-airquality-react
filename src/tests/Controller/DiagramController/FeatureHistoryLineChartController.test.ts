import { ObservationStation } from "../../../Model/ObservationStation";
import { Feature } from "../../../Model/Feature";
import { Scale } from "../../../Model/Scale";
import { Position } from "../../../Model/Position";
import { ChartType } from "../../../Controller/DiagramController/DiagramController";
import { FeatureHistoryLineChartController } from "../../../Controller/DiagramController/FeatureHistoryLineChartController";
import Language from "../../../Controller/Storage/Language";

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
let controller = new FeatureHistoryLineChartController(observationStation, feature);


//getID
test("should return ID", () => {
    expect(controller.getID()).toBe('FeatureHistoryLineChart');
});

//setConfigurationOption
/* test('should not crash', () => {
    expect(() => controller.setConfigurationOption('last_24_hours')).not.toThrow();
}); */
test('should throw error', () => {
    expect(() => controller.setConfigurationOption('false_confoguration_option')).toThrow();
});

//getChartType
test('should return chart type', () => {
    expect(controller.getChartType()).toBe(ChartType.LINE_CHART);
});

//getGraphicsOptions
test('should return google charts options', () => {
    expect(controller.getGraphicsOptions()).toMatchObject({});
});

//isConfigurable
test('should be configurable', () => {
    expect(controller.isConfigurable()).toBeTruthy();
});

//getConfigurationOptions
test('should return configuration options', () => {
    expect(controller.getConfigurationOptions()).toStrictEqual([
        Language.getInstance().getText('last_24_hours'),
        Language.getInstance().getText('last_7_days'),
        Language.getInstance().getText('last_31_days'),
        Language.getInstance().getText('last_year')
    ]);
});

//getCurrentConfigurationOption
test('should return current configuration options', () => {
    expect(controller.getCurrentConfigurationOption()).toBe(Language.getInstance().getText('last_24_hours'));
});

//getData
test('should not crash', () => {
    expect(() => controller.getData('last_24_hours')).not.toThrowError();
});
test('should return right data format', () => {
    expect(controller.getData('last_24_hours')).toBeInstanceOf(Promise);
});