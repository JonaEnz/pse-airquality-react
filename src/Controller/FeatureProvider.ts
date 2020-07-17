import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";

export default class FeatureProvider {
    private static PATH = "../Jsons/";
    private path: string;
    private context: any;
    private features: { [id: string]: Feature };
    private static instance: FeatureProvider | null = null;

    constructor(path: string) {
        this.path = path;
        this.features = {};
        this.context = require.context("../Jsons/", true);
        //this.addFeature(b(test));
    }

    static getInstance(): FeatureProvider {
        if (!this.instance) {
            this.instance = new FeatureProvider(this.PATH);
        }
        return this.instance;
    }

    private addFeature(definition: FeatureDefinition) {
        if (definition) {
            var f = new Feature(
                definition.id,
                definition.nameId,
                definition.descriptionId,
                new Scale(true, definition.defaultScale),
                definition.webLinkId,
                definition.limit,
                definition.unitOfMeasurement,
                definition.diagrams
            );
            this.features[f.getId()] = f;
        }
    }

    //Returns all loaded features
    listAllFeatures(): Feature[] {
        return Object.keys(this.features).map((key) => {
            return this.features[key];
        });
    }

    getFeature(featureId: string): Feature | undefined {
        if (Object.keys(this.features).includes(featureId)) {
            return this.features[featureId];
        } else {
            var f = this.getFeatureById(featureId);
            if (f) {
                //Successfully read feature json
                this.features[featureId] = f;
                return f;
            } else {
                console.log("Failed to read, " + featureId, ".");
                return undefined;
            }
        }
    }

    private getFeatureById(featureId: string): Feature | null {
        featureId = featureId.replace(/:/g, "");
        try {
            var json = this.context("./" + featureId + ".json");
        } catch {
            return null;
        }
        if (!json) {
            return null; //Failed to read file
        }
        var definition = json as FeatureDefinition;
        return new Feature(
            definition.id,
            definition.nameId,
            definition.descriptionId,
            new Scale(true, definition.defaultScale),
            definition.webLinkId,
            definition.limit,
            definition.unitOfMeasurement,
            definition.diagrams
        );
    }
}

interface FeatureDefinition {
    id: string;
    nameId: string;
    unitOfMeasurement: string;
    descriptionId: string;
    defaultScale: { [key: number]: string };
    webLinkId: string;
    limit: number;
    diagrams: string[];
}
