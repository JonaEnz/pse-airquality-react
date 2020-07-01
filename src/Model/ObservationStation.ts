import { Position } from './Position';
import { Feature } from './Feature';

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

    public getDiagramms(): void {

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