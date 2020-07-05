import { Scale } from "../../Model/Scale";
var scale: Scale;
test("Create new scale without linear transition", () => {
  scale = new Scale(false, {
    10: "#000000",
    30: "#AABBCC",
    20: "#AAFFAA",
    999: "#BB00FF",
  });
  expect(scale.getColor(20).getRGB()).toStrictEqual({ r: 170, b: 170, g: 255 }); //Check if auto sort is working
});

test("getColor()", () => {
  expect(scale.getColor(25).getHex()).toStrictEqual("#AAFFAA");
});

test("Second highest value color", () => {
  expect(scale.getColor(35).getHex()).toStrictEqual("#AABBCC");
});

test("Highest value color", () => {
  expect(scale.getColor(1000).getHex()).toStrictEqual("#BB00FF");
});

test("Interpolate", () => {
  scale = new Scale(true, {
    10: "#000000",
    20: "#AAFFAA",
    30: "#AABBCC",
    999: "#BB00FF",
  });
  expect(scale.getColor(25).getHex()).toStrictEqual("#AADDBB");
});
