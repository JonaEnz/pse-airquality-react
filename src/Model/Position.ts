export class Position {
  private latitude: number;

  private longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
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
    return this.latitude + " °N " + this.longitude + " °O";
  }
}
