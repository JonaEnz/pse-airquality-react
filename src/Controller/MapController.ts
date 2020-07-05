import { MapPin } from "../Model/MapPin";
import { ObservationStation } from "../Model/ObservationStation";
import { Viewport } from "../Model/Viewport";

export class MapController {
  handlePopup(pin: MapPin): ObservationStation {
    throw Error("Not implemented");
  }

  handleViewportChange(viewport: Viewport) {}
}
