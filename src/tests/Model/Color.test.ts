import { Color } from "../../Model/Color";

var colorFromNumbers = new Color(0, 0, 0); //Should throw no errors
test("toColor() with (0, 0, 0)", () => {
  expect(colorFromNumbers.getRGB()).toStrictEqual({ r: 0, g: 0, b: 0 });
});

test("Negative color value in constructor", () => {
  expect(() => {
    new Color(-1, 0, 0);
  }).toThrowError(TypeError);
});

test("Color value bigger than 255 in constructor", () => {
  expect(() => {
    new Color(256, 0, 0);
  }).toThrowError(TypeError);
});

test("Color from Hex", () => {
  expect(Color.getColorFromHex("#010000").getRGB()).toStrictEqual({
    r: 1,
    g: 0,
    b: 0,
  });
});

var color = Color.getColorFromHex("#ffffff");

test("GetHex()", () => {
  expect(color.getHex()).toStrictEqual("#FFFFFF");
});
