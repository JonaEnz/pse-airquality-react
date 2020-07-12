import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";

export default class FeatureProvider {
    private static PATH = "../Jsons/";
    private path: string;
    private features: { [id: string]: Feature };
    private static instance: FeatureProvider | null = null;

    constructor(path: string) {
        this.path = path;
        this.features = {};
    }

    static getInstance(): FeatureProvider {
        if (!this.instance) {
            this.instance = new FeatureProvider(this.PATH);
        }
        return this.instance;
    }

    getFeature(featureId: string): Feature {
        if (Object.keys(this.features).includes(featureId)) {
            return this.features[featureId];
        } else {
            var f = this.getFeatureById(featureId);
            if (f) {
                //Successfully read feature json
                this.features[featureId] = f;
                return f;
            } else {
                throw new Error(
                    "Failed at reading definition for " + featureId
                );
            }
        }
    }

    private getFeatureById(featureId: string): Feature | null {
        var json = require(this.path + featureId + ".json");

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
