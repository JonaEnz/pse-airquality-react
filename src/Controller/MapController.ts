import { MapPin } from "../Model/MapPin";
import { ObservationStation } from "../Model/ObservationStation";
import { Viewport } from "../Model/Viewport";
import { Position } from "../Model/Position";
import { Observation } from "../Model/Observation";
import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";

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
      "id1",
      "name1",
      "desc1",
      new Position(49, 8.4),
      []
    );
    return new Observation(
      station,
      this.selectedFeature,
      10,
      new Date(Date.now())
    );
  }

  handleViewportChange(viewport: Viewport) {}
}
