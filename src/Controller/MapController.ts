import { MapPin } from "../Model/MapPin";
import { ObservationStation } from "../Model/ObservationStation";
import { Viewport } from "../Model/Viewport";
import { Position } from "../Model/Position";
import { Observation } from "../Model/Observation";
import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";
import { Color } from "../Model/Color";
import { Polygon } from "../Model/Polygon";

export class MapController {
  selectedFeature: Feature = new Feature(
    "featureId",
    "featureName",
    "",
    new Scale(false, {}),
    "weblink",
    20,
    "°C",
    []
  );

  handlePopup(pin: MapPin): Observation {
    var station = new ObservationStation(
      pin.getId(),
      pin.getId(),
      "desc1",
      pin.getPosition(),
      []
    );
    return new Observation(
      station,
      this.selectedFeature,
      15,
      new Date(Date.now())
    );
  }

  handleViewportChange(viewport: Viewport) {}

  getPins(): MapPin[] {
    return [
      new MapPin(
        "pin1",
        new Position(49, 8.5),
        10,
        new Color(
          Math.floor(255 * Math.random()),
          Math.floor(255 * Math.random()),
          Math.floor(255 * Math.random())
        )
      ),
    ];
  }

  getPolygons(): Polygon[] {
    return [];
  }
}
