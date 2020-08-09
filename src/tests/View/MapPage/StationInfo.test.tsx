import React from "react";
import { StationInfo } from "../../../View/MapPage/StationInfo";
import TestHelper from "../../TestHelper";
import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import Language from "../../../Controller/Storage/Language";

let language = Language.getInstance();
language.changeLanguage("de-de");

const stationInfo = render(
    <StationInfo lastObservation={TestHelper.getTestObservation(100.123)} />
);

test("Render", () => {
    expect(stationInfo.getByText("100.12 UoM")).toBeInTheDocument();
    expect(stationInfo.getByTestId("featureWebLink")).toHaveProperty(
        "href",
        language.getText("testWebLink")
    );
});

const stationI = shallow(
    <StationInfo lastObservation={TestHelper.getTestObservation(10)} />
);

test("Enzyme", () => {
    expect(stationI.find("a")).toExist(); //WebLink exists
});
