import Legend from "../../../View/MapPage/Legend";
import { shallow } from "enzyme";
import React from "react";
import TestHelper from "../../TestHelper";
import { render } from "@testing-library/react";

test("Render", () => {
    var legend = render(
        <Legend
            unit="uoM"
            scale={TestHelper.getTestScale()}
            min={0}
            max={100}
        />
    );
    expect(legend.getByTestId("legend")).toBeInTheDocument();
});
