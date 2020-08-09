import { Feature } from "../../Model/Feature";
import { Scale } from "../../Model/Scale";
import Language from "../../Controller/Storage/Language";
import { Observation } from "../../Model/Observation";
import { ObservationStation } from "../../Model/ObservationStation";
import { Position } from "../../Model/Position";
import TestHelper from "../TestHelper";

const ID_GERMAN = "de-de";

var feature = new Feature(
    "testId",
    "testNameId",
    "testNameDesc",
    new Scale(false, { 0: "#000000" }),
    "testWebLink",
    100,
    "testUoM",
    ["FeatureHistoryLineChart"],
    "testIcon"
);

test("Id, Limit, Scale and icon assigned correctly", () => {
    expect(feature.getId()).toBe("testId");
    expect(feature.getLimit()).toBe(100);
    expect(feature.getRelatedScale().getColor(10).getHex()).toStrictEqual(
        "#000000"
    );
    expect(feature.getIconName()).toStrictEqual("testIcon");
    expect(feature.getUnitOfMeasurement()).toStrictEqual("testUoM");
});

test("Check Name, Description and Link in German", () => {
    Language.getInstance().changeLanguage(ID_GERMAN);
    expect(feature.getName()).toStrictEqual("Test Name");
    expect(feature.getDescription()).toStrictEqual("Test Beschreibung");
    expect(feature.getRelatedWeblink()).toStrictEqual("https://testlink/");
});

test("Limit exceeded", () => {
    var obs = TestHelper.getTestObservation(100);
    expect(feature.isLimitExceeded(obs)).toBe(false);
    obs = TestHelper.getTestObservation(101);
    expect(feature.isLimitExceeded(obs)).toBe(true);
    obs = TestHelper.getTestObservation(99.5);
    expect(feature.isLimitExceeded(obs)).toBe(false);
});

test("Diagram controller", () => {
    var obs = TestHelper.getTestObservationStation();
    expect(feature.getDiagramController(obs).length).toBeGreaterThanOrEqual(1);
});
