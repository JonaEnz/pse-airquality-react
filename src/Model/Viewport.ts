import { Position } from "../Model/Position";

export class Viewport {
    private center: Position;
    private zoom: number;

    constructor(center: Position, zoom: number) {
        this.center = center;
        this.zoom = zoom;
        if (this.zoom < 0) {
            this.zoom = 0;
        }
    }

    getCenter(): Position {
        return this.center;
    }

    getZoom(): number {
        return this.zoom;
    }

    getRadius(): number {
        return this.zoom; //TODO: fix this
    }

    setCenter(position: Position) {
        this.center = position;
    }

    setZoom(zoom: number) {
        this.zoom = zoom;
        if (this.zoom < 0) {
            this.zoom = 0;
        }
    }
}
