import { Scale } from "./Scale";
import { Observation } from "./Observation";
import { ObservationStation } from "./ObservationStation";
import Language from "../Controller/Storage/Language";
import Diagram from "../View/Diagram";

export class Feature {
  private id: string;
  private nameId: string;
  private descriptionId: string;
  private scale: Scale;
  private relatedWeblinkId: string;
  private limit: number;
  private unitOfMeasurement: string;
  private drawableDiagramIds: string[];

  constructor(
    id: string,
    nameId: string,
    descriptionId: string,
    scale: Scale,
    relatedWeblinkId: string,
    limit: number,
    unitOfMeasurement: string,
    drawableDiagramIds: string[]
  ) {
    this.id = id;
    this.nameId = nameId;
    this.descriptionId = descriptionId;
    this.scale = scale;
    this.relatedWeblinkId = relatedWeblinkId;
    this.limit = limit;
    this.unitOfMeasurement = unitOfMeasurement;
    this.drawableDiagramIds = drawableDiagramIds;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return Language.getText(this.nameId);
  }

  public getDescription(): string {
    return Language.getText(this.descriptionId);
  }

  public getRelatedScale(): Scale {
    return this.scale;
  }

  public getRelatedWeblink(): string {
    return Language.getText(this.relatedWeblinkId);
  }

  //Todo: implement Method
  public getDrawableDiagrams(observationStation: ObservationStation): Diagram[] {
    var diagrams: Diagram[] = new Array();
    return diagrams;
  }

  public getLimit(): number {
    return this.limit;
  }

  public getUnitOfMeasurement(): string {
    return this.unitOfMeasurement;
  }

  public isLimitExceeded(observation: Observation): boolean {
    return observation.getValue() > this.limit;
  }
}
