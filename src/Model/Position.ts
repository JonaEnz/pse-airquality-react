export class Position {
    private latitude: number;

    private longitude: number;

    constructor(latitude: number, longitude: number) {
        if (Math.abs(latitude) >= 90 || Math.abs(longitude) >= 180) {
            throw new Error(
                "Not valid coordinates: " + latitude + "°N, " + longitude + "°O"
            );
        }
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getDistance(pos: Position): number {
        return Math.sqrt(
            Math.pow(this.latitude - pos.getLatitude(), 2) +
                Math.pow(this.longitude - pos.getLongitude(), 2)
        );
    }

    getCoordinates(): { lat: number; lng: number } {
        var lat = this.latitude;
        var lng = this.longitude;
        return { lat, lng };
    }

    getLatitude(): number {
        return this.latitude;
    }

    getLongitude(): number {
        return this.longitude;
    }

    getString(): string {
        return (
            (Math.round(this.latitude * 100) / 100).toString() +
            " °N " +
            Math.round(this.longitude * 100) / 100 +
            " °O"
        );
    }
}
