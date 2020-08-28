import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";
import { Color } from "../Model/Color";
import { Observation } from "../Model/Observation";
import { ObservationStation } from "../Model/ObservationStation";
import { Position } from "../Model/Position";

export default class TestHelper {
    static FEATURE_NAME = "testNameId";
    static FEATURE_ID = "testId";
    static FEATURE_DESC = "testNameDesc";
    static FEATURE_UOM = "UoM";
    static FEATURE_ICON = "testIcon";
    static FEATURE_LINK = "testWebLink";

    static getTestFeature(): Feature {
        return new Feature(
            TestHelper.FEATURE_ID,
            TestHelper.FEATURE_NAME,
            TestHelper.FEATURE_DESC,
            TestHelper.getTestScale(),
            TestHelper.FEATURE_LINK,
            100,
            TestHelper.FEATURE_UOM,
            [],
            TestHelper.FEATURE_ICON
        );
    }

    static getTestObservation(value: number): Observation {
        return new Observation(
            TestHelper.getTestObservationStation(),
            TestHelper.getTestFeature(),
            value,
            new Date(Date.now())
        );
    }
    static getTestObservationStation(
        lan: number = 0,
        lng: number = 0
    ): ObservationStation {
        return new ObservationStation(
            "stationId",
            "testNameId",
            "testNameDesc",
            new Position(lan, lng),
            []
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
