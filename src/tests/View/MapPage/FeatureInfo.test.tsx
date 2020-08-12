import FeatureInfo from "../../../View/MapPage/FeatureInfo";
import TestHelper from "../../TestHelper";
import { shallow } from "enzyme";
import React from "react";
import Language from "../../../Controller/Storage/Language";

test("Render", () => {
    var featureInfo = shallow(
        <FeatureInfo feature={TestHelper.getTestFeature()} />
    );

    featureInfo.find("#infoAvatar").simulate("onClick"); //open

    expect(featureInfo.find(".linkButton")).toIncludeText(
        Language.getInstance().getText("RelatedLink")
    );

    featureInfo.find("#infoAvatar").simulate("onClick"); //close
});
