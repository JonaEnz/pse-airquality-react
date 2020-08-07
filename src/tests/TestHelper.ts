import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";
import { Color } from "../Model/Color";

export default class TestHelper {
    static FEATURE_NAME = "testName";
    static FEATURE_ID = "testId";
    static FEATURE_DESC = "testDesc";
    static FEATURE_UOM = "UoM";
    static FEATURE_ICON = "testIcon";

    static getTestFeature(): Feature {
        return new Feature(
            TestHelper.FEATURE_ID,
            TestHelper.FEATURE_NAME,
            TestHelper.FEATURE_DESC,
            TestHelper.getTestScale(),
            "",
            Math.random() * 100,
            TestHelper.FEATURE_UOM,
            [],
            TestHelper.FEATURE_ICON
        );
    }

    static getTestScale(): Scale {
        var dict: { [key: number]: string } = {};
        for (let index = 0; index < 10; index++) {
            dict[index] = TestHelper.getTestColor().getHex();
        }
        return new Scale(false, dict);
    }

    static getTestColor(): Color {
        return new Color(
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        );
    }
}
