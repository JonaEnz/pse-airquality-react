import FeatureSelect from "../../../View/MapPage/FeatureSelect";
import React from "react";
import { shallow } from "enzyme";
import MapConfiguration from "../../../Controller/MapPage/MapConfiguration";
import Language from "../../../Controller/Storage/Language";
import FeatureProvider from "../../../Controller/FeatureProvider";

let language = Language.getInstance();

var onConfChangeMock = jest.fn((mc: MapConfiguration) => {});
var featureSelect = shallow(
    <FeatureSelect onConfigurationChange={onConfChangeMock} />
);

test("Render", () => {
    //open
    featureSelect
        .find("#avatarButton")
        .simulate("click", { currentTarget: true });

    expect(featureSelect.find("#title")).toIncludeText(
        language.getText("map_configuration_title")
    );
});

test("Select Feature", () => {
    var feature = FeatureProvider.getInstance().listAllFeatures()[0].getId();

    featureSelect.find("#featureSelectForm").simulate("change", {
        target: { value: feature },
    });
});

test("Select Configuration", () => {
    featureSelect.find("#confSelectForm").simulate("change", {
        target: { value: "NearConfiguration" },
    });
    expect(featureSelect.find("#confSelectForm").prop("value")).toStrictEqual(
        "NearConfiguration"
    );

    featureSelect.find("#confSelectForm").simulate("change", {
        target: { value: "PolygonConfiguration" },
    });
    expect(featureSelect.find("#confSelectForm").prop("value")).toStrictEqual(
        "PolygonConfiguration"
    );

    featureSelect.find("#confSelectForm").simulate("change", {
        target: { value: "StationConfiguration" },
    });
    expect(featureSelect.find("#confSelectForm").prop("value")).toStrictEqual(
        "StationConfiguration"
    );

    featureSelect.find("#confSelectForm").simulate("change", {
        target: { value: "invalid" },
    });
    expect(featureSelect.find("#confSelectForm").prop("value")).toStrictEqual(
        "StationConfiguration"
    );
});

test("Render with startConf", () => {
    var startConf = {
        conf: "NearConfiguration",
        feature: "saqn:op:mcpm2p5",
    };
    var select = shallow(
        <FeatureSelect
            onConfigurationChange={onConfChangeMock}
            startConf={startConf}
        />
    );
    //open
    select.find("#avatarButton").simulate("click", { currentTarget: true });

    expect(select.find("#confSelectForm").prop("value")).toStrictEqual(
        "NearConfiguration"
    );
    expect(select.find("#featureSelectForm").prop("value")).toStrictEqual(
        "saqn:op:mcpm2p5"
    );
});
