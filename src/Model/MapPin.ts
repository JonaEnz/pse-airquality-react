import { Color } from "./Color";
import { Position } from "./Position";

export class MapPin {
  private id: string;
  private position: Position;
  private value: number;
  private color: Color;

  constructor(id: string, position: Position, value: number, color: Color) {
    this.id = id;
    this.position = position;
    this.value = value;
    this.color = color;
  }

  getPosition(): Position {
    return this.position;
  }

  setPosition(position: Position) {
    this.position = position;
  }

  getValue(): number {
    return this.value;
  }

  setValue(value: number) {
    this.value = value;
  }

  getId(): string {
    return this.id;
  }

  getColor(): Color {
    return this.color;
  }
}
