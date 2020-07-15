import { Position } from './Position';
import { Feature } from './Feature';
import Diagram from '../View/Diagrams/Diagram';
import IDiagramController from '../Controller/DiagramController';

export class ObservationStation {
    private id: string;
    private name: string;
    private description: string;
    private position: Position;
    private availableFeatures: Feature[];

    constructor(id: string, name: string, description: string, position: Position, availableFeatures: Feature[]) {
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
        var diagramController: IDiagramController[] = [];

        this.availableFeatures.forEach(feature => {
            let featureDiagramControllerArray = feature.getDiagramController(this);
            featureDiagramControllerArray.forEach(contr => {
                diagramController.push(contr);
            });
        });

        return diagramController;
    }

    public hasFeature(feature: Feature): boolean {
        //Not sure if this works 
        var found: boolean = false;
        var length: number = this.availableFeatures.length;
        for (var counter: number = 0; counter < length; counter++) {
            if (feature === this.availableFeatures[counter]) {
                found = true;
            }
        }
        return found;
    }
}