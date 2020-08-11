import Timespan from "../../Model/Timespan";

var timespan = new Timespan(1000 * 60 * 60); //1 hour timespan
var now = Date.now();
test("Timespan Test", () => {
    expect(timespan.length).toBe(1000 * 60 * 60);
    var expStart = new Date(now);
    expStart.setTime(expStart.getTime() - 60 * 60 * 1000);
    var expEnd = new Date(now);
    expEnd.setTime(expEnd.getTime() + 60 * 60 * 1000);
    expect(timespan.getStart(new Date(now))).toStrictEqual(expStart);
    expect(timespan.getEnd(new Date(now))).toStrictEqual(expEnd);
});
