import { MapPin } from "../Model/MapPin";
import { ObservationStation } from "../Model/ObservationStation";
import { Viewport } from "../Model/Viewport";
import { Position } from "../Model/Position";

export class MapController {
  handlePopup(pin: MapPin): ObservationStation {
    return new ObservationStation(
      "id1",
      "name1",
      "desc1",
      new Position(49, 8.4),
      []
    );
  }

  handleViewportChange(viewport: Viewport) {}
}
