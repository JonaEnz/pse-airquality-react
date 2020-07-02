import { Color } from "./Color";

export class Scale {
  private linearTransition: boolean;
  private dict: { [key: number]: string };

  constructor(linearTransition: boolean, colors: { [key: number]: string }) {
    this.linearTransition = linearTransition;
    this.dict = colors;
    this.sortOnKeys();
  }

  getColor(value: number): Color {
    var keys = Object.keys(this.dict);
    for (let index = 0; index < keys.length - 1; index++) {
      if (parseInt(keys[index]) <= value && parseInt(keys[index + 1]) > value) {
        if (this.linearTransition) {
          return this.getLinearTransition(index, value); //Interpolate values of this and next index
        } else {
          return Color.getColorFromHex(
            (this.dict[parseInt(keys[index])] as unknown) as string
          ); //Get Hex-Color directly.
        }
      }
    }
    return Color.getColorFromHex(
      (this.dict[parseInt(keys[keys.length - 1])] as unknown) as string
    ); //If the value is higher than any in the list, return highest value color.
  }

  private sortOnKeys() {
    //Sorts the dictionary by key value (ascending).
    var keys = Object.keys(this.dict);
    var numKeys: number[] = [];

    for (let i = 0; i < keys.length; i++) {
      numKeys.push(parseInt(keys[i]));
    }

    numKeys.sort();
    var tempDict: { [key: number]: string } = {};
    for (let i = 0; i < keys.length; i++) {
      tempDict[numKeys[i]] = this.dict[numKeys[i]];
    }
    this.dict = tempDict;
  }

  private getLinearTransition(lowerIndex: number, value: number): Color {
    var a = [parseInt(Object.keys(this.dict)[lowerIndex]), ""]; // lower value
    a[1] = this.dict[a[0] as number]; //Hex-Color of lower value
    var b = [parseInt(Object.keys(this.dict)[lowerIndex + 1]), ""]; //higher value
    b[1] = this.dict[b[0] as number]; //Hex-Color of higher value
    var colorA = Color.getColorFromHex(a[1] as string).getRGB();
    var colorB = Color.getColorFromHex(b[1] as string).getRGB();

    //Interpolate all RGB values for colors A and B at value
    var resR = this.interpolate(
      [a[0] as number, colorA.r],
      [b[0] as number, colorB.r],
      value
    );
    var resG = this.interpolate(
      [a[0] as number, colorA.g],
      [b[0] as number, colorB.g],
      value
    );
    var resB = this.interpolate(
      [a[0] as number, colorA.b],
      [b[0] as number, colorB.b],
      value
    );

    return new Color(resR, resG, resB); //Color constructor floors values, decimals are cut off.
  }

  private interpolate(
    a: [number, number],
    b: [number, number],
    value: number
  ): number {
    var add = b[0] - a[0];
    return (
      a[1] * ((add - value + a[0]) / add) + b[1] * ((add - b[0] + value) / add)
    ); //Interpolate with values a[0] and b[0] and weights a[1] and b[1] at value.
  }
}
