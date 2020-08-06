import TestHelper from "./TestHelper";
import { Color } from "../Model/Color";

var color = TestHelper.getTestColor();
var feature = TestHelper.getTestFeature();
var scale = TestHelper.getTestScale();

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
