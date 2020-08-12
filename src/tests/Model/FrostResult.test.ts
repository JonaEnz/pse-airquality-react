import { FrostResult } from "../../Model/FrostResult";

var frostResult = new FrostResult<string>("Result", true);
var errorResult = new FrostResult<string>(null, false, "ErrMes");

test("Getters", () => {
    expect(frostResult.getResult()).toStrictEqual("Result");
    expect(frostResult.getSuccess()).toBeTruthy();
});

test("Error", () => {
    expect(errorResult.getSuccess()).toBeFalsy();
    expect(errorResult.getMessage()).toStrictEqual("ErrMes");
    expect(errorResult.getResult()).toBeNull();
});
