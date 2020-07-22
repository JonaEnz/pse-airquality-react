import React from 'react';

import { Scale } from "./Scale";
import { Observation } from "./Observation";
import { ObservationStation } from "./ObservationStation";
import Language from "../Controller/Storage/Language";
import DiagramFactory from '../Controller/DiagramController/DiagramFactory';
import IDiagramController from '../Controller/DiagramController/DiagramController';

let language = Language.getInstance();

export class Feature {

  private id: string;
  private nameId: string;
  private descriptionId: string;
  private scale: Scale;
  private relatedWeblinkId: string;
  private limit: number;
  private unitOfMeasurement: string;
  private controllerIds: string[];
  private iconName: string;

  constructor(
    id: string,
    nameId: string,
    descriptionId: string,
    scale: Scale,
    relatedWeblinkId: string,
    limit: number,
    unitOfMeasurement: string,
    controllerIds: string[],
    iconName: string,
  ) {
    this.id = id;
    this.nameId = nameId;
    this.descriptionId = descriptionId;
    this.scale = scale;
    this.relatedWeblinkId = relatedWeblinkId;
    this.limit = limit;
    this.unitOfMeasurement = unitOfMeasurement;
    this.controllerIds = controllerIds;
    this.iconName = iconName;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    //return Language.getText(this.nameId);
    return this.nameId;
  }

  public getDescription(): string {
    //return Language.getText(this.descriptionId);
    return this.descriptionId;
  }

  public getRelatedScale(): Scale {
    return this.scale;
  }

  public getRelatedWeblink(): string {
    //return Language.getText(this.relatedWeblinkId);
    return this.relatedWeblinkId;
  }

  public getDiagramController(observationStation: ObservationStation): IDiagramController[] {
    var diagramController = new Array<IDiagramController>();

    this.controllerIds.forEach(id => {
      let controller = DiagramFactory.getDiagramController(id, observationStation, this);
      diagramController.push(controller);
    });

    return diagramController;
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

  public getIconName(): string {
    return this.iconName;
  }
}
