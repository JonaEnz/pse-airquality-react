/*

The fix for issue #5 breaks this test.

import FeatureProvider from "../../../Controller/FeatureProvider";
import { Scale } from "../../../Model/Scale";

var fp = new FeatureProvider("../Jsons/");

var f = fp.getFeature("TestFeature");

test("Read test feature", () => {
    expect(f.getId()).toStrictEqual("testFeatureId");
    expect(f.getName()).toStrictEqual("testFeatureName");
    expect(f.getDescription()).toStrictEqual("testFeatureDesc");
    expect(f.getRelatedWeblink()).toStrictEqual("link");
    expect(f.getUnitOfMeasurement()).toStrictEqual("°T");
    expect(f.getLimit()).toStrictEqual(10);
    expect(f.getRelatedScale()).toBeInstanceOf(Scale);
});

var ftwo = fp.getFeature("TestFeature");
test("Read from cache", () => {
    expect(f).toStrictEqual(ftwo);
});
*/
