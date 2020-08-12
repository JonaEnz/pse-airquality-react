import TestHelper from "./TestHelper";
import { Color } from "../Model/Color";

var color = TestHelper.getTestColor();
var feature = TestHelper.getTestFeature();
var scale = TestHelper.getTestScale();
var observation = TestHelper.getTestObservation(100);
var obsStation = TestHelper.getTestObservationStation(1, 2);

function isColorValid(c: Color): boolean {
    var rgb = c.getRGB();
    if (rgb.r > 255 || rgb.r < 0) {
        return false;
    }
    if (rgb.g > 255 || rgb.g < 0) {
        return false;
    }
    if (rgb.b > 255 || rgb.b < 0) {
        return false;
    }

    return true;
}

test("Color", () => {
    expect(isColorValid(color)).toBeTruthy();
});

test("Scale", () => {
    for (let index = 0; index < 20; index++) {
        var r = Math.random() * 200 - 100;
        expect(isColorValid(scale.getColor(r))).toBeTruthy();
    }
});

test("Feature", () => {
    expect(feature.getId()).toStrictEqual(TestHelper.FEATURE_ID);
});

test("Observation", () => {
    expect(observation.getValue()).toBe(100);
});

test("ObservationStation", () => {
    expect(obsStation.getPosition().getCoordinates()).toStrictEqual({
        lat: 1,
        lng: 2,
    });
});
