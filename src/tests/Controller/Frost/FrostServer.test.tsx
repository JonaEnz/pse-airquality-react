import FrostServer from "../../../Controller/Frost/FrostServer";
import FrostFactory from "../../../Controller/Frost/FrostFactory";
import { FrostResult } from "../../../Model/FrostResult";


class TestStationFactory extends FrostFactory<number> {
    constructor() {
        super(
            {
                convert: jest.fn((json, options) => {
                    if (json.attribute === testJson.attribute) {
                        return 8;
                    } else {
                        throw new Error();
                    }
                })
            },
            {
                getQuery: jest.fn(() => "testQuery")
            });
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


test("test request method", () => {
    expect.assertions(1);
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve(
        { json: () => Promise.resolve(testJson), ok: true }));
    return fs.request(new TestStationFactory(), {}).then((res) => expect(res.getResult()).toEqual(8));
});

test("test request method with error in convert", () => {
    expect.assertions(1);
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve(
        { json: () => Promise.resolve(faultyJson), ok: true }));
    return fs.request(new TestStationFactory(), {}).then((res) => expect(res.getSuccess()).toBeFalsy());
});

test("test request method with fetch error", () => {
    expect.assertions(1);
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve(
        { ok: false }));
    return fs.request(new TestStationFactory(), {}).then((res) => expect(res.getSuccess()).toBeFalsy());
});

const testJson = { attribute: "string" };
const faultyJson = { attribut: "meh" };