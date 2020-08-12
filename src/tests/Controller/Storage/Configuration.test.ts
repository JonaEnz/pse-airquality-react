import Configuration from "../../../Controller/Storage/Configuration";
import "../../../Jsons/config.json";

//TODO: Mock invalid json
let conf = Configuration.getInstance();

test("Valid values", () => {
    expect(conf.getLanguage()).not.toHaveLength(0);
    expect(conf.getFrostUrl().startsWith("http")).toBeTruthy();
});
