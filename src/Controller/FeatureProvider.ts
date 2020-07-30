import { Feature } from "../Model/Feature";
import { Scale } from "../Model/Scale";
import * as featureDefinition from "../Jsons/features.json";

export default class FeatureProvider {
    //private context: any;
    private features: { [id: string]: Feature };
    private static instance: FeatureProvider | null = null;

    constructor() {
        this.features = {};
        //@ts-ignore
        (featureDefinition.features as FeatureDefinition[]).forEach((f) => {
            this.addFeature(f);
        });
    }

    static getInstance(): FeatureProvider {
        if (!this.instance) {
            this.instance = new FeatureProvider();
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
                definition.diagrams,
                definition.icon
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
            return undefined;
        }
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
    icon: string;
}
