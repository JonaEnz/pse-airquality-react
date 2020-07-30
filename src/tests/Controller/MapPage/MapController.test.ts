import { MapController } from "../../../Controller/MapPage/MapController";
import { Color } from "../../../Model/Color";
import Language from "../../../Controller/Storage/Language";

var controller = new MapController(false); //New controller with default data
Language.getInstance();

test("Valid default viewport", () => {
    var vp = controller.getViewport();
    var center = vp.getCenter();
    expect(Math.abs(center.getLatitude())).toBeLessThanOrEqual(90);
    expect(Math.abs(center.getLongitude())).toBeLessThanOrEqual(180);
    expect(vp.getZoom()).toBeGreaterThan(0);
    expect(vp.getRadius()).toBeGreaterThanOrEqual(0);
});

test("check scale", () => {
    var scale = controller.getScale();
    expect(scale.getColor(-10)).toBeInstanceOf(Color);
    expect(scale.getColor(0)).toBeInstanceOf(Color);
    expect(scale.getColor(100)).toBeInstanceOf(Color);
});
