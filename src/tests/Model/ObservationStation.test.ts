import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import TestHelper from "../TestHelper";
import { Feature } from "../../Model/Feature";

var position = new Position(10, 10);
var feature = TestHelper.getTestFeature();
var station = new ObservationStation("idTest", "Name", "Desc", position, [
    feature,
]);

test("getId", () => {
    expect(station.getId()).toStrictEqual("idTest");
});

test("getName", () => {
    expect(station.getName()).toStrictEqual("Name");
});

test("getDescription", () => {
    expect(station.getDescription()).toStrictEqual("Desc");
});

test("getPosition", () => {
    expect(station.getPosition().getCoordinates()).toStrictEqual({
        lat: 10,
        lng: 10,
    });
});

test("getFeatures", () => {
    expect(station.getFeatures()).toStrictEqual([feature]);
});

test("Controller", () => {
    //The test feature does not support diagrams
    expect(station.getDiagramController()).toStrictEqual([]);
});

var feature2 = new Feature(
    "nonExistingId",
    "",
    "",
    TestHelper.getTestScale(),
    "",
    100,
    "",
    [],
    ""
);

test("hasFeature", () => {
    expect(station.hasFeature(TestHelper.getTestFeature())).toBeTruthy();
    expect(station.hasFeature(feature2)).toBeFalsy();
});
