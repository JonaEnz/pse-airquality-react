export default class Timespan {

  //length in milliseconds
  length: number;

  constructor(length: number) {
    this.length = length;
  }

  //returns the end of a timespan given the start date
  public getEnd(start: Date): Date {
    return (new Date(start.valueOf() + this.length));
  }

  //returns the start of a timespan given the end date
  public getStart(end: Date): Date {
    return (new Date(end.valueOf() - this.length));
  }
}
