import { Position } from "./Position";
import { Feature } from "./Feature";
import IDiagramController from "../Controller/DiagramController/DiagramController";

export class ObservationStation {
    private id: string;
    private name: string;
    private description: string;
    private position: Position;
    private availableFeatures: Feature[];

    constructor(
        id: string,
        name: string,
        description: string,
        position: Position,
        availableFeatures: Feature[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.position = position;
        this.availableFeatures = availableFeatures;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getPosition(): Position {
        return this.position;
    }

    public getFeatures(): Feature[] {
        return this.availableFeatures;
    }

    public getDiagramController(): IDiagramController[] {
        var diagramController = new Array<IDiagramController>();

        for (let feature of this.availableFeatures) {
            let featureDiagramControllerArray = feature.getDiagramController(
                this
            );
            for (let controller of featureDiagramControllerArray) {
                diagramController.push(controller);
            }
        }
        return diagramController;
    }

    public hasFeature(feature: Feature): boolean {
        return this.availableFeatures.find((f) => f.getId() === feature.getId())
            ? true
            : false;
    }
}
