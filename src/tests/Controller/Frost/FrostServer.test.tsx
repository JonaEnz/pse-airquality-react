import FrostServer from "../../../Controller/Frost/FrostServer";
import FrostFactory from "../../../Controller/Frost/FrostFactory";
import { FrostResult } from "../../../Model/FrostResult";


class TestStationFactory extends FrostFactory<number> {
    constructor() {
        super({ convert: jest.fn((json, options) => json.testNumber) }, { getQuery: jest.fn(() => "testQuery") });
    }
}




let fs: FrostServer = new FrostServer("myUrl");
let ff: TestStationFactory = new TestStationFactory();

test("test for url handling", () => {
    expect(fs.getUrl()).toBe("myUrl");
    let url: string = "otherUrl";
    fs.setUrl(url);
    expect(fs.getUrl()).toBe(url);
});
