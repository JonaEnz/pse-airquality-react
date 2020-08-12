import FeatureProvider from "../FeatureProvider";
import { isNullOrUndefined } from "util";

export default class Configuration {
    private static instance: Configuration | null;
    private language: string = "de-de";
    private frostUrl: string = "";

    // Return singleton instance
    static getInstance(): Configuration {
        if (!Configuration.instance) {
            Configuration.load();
        }
        return Configuration.instance as Configuration;
    }

    // Load instance from config.json
    private static load() {
        var json = require("../../Jsons/config.json"); //Load config
        var iConf = json as IConfig;
        console.log(iConf);
        if (isNullOrUndefined(iConf)) {
            throw new Error("Config.json has wrong format.");
        }
        var newConf = new Configuration();
        newConf.language = iConf.language;
        newConf.frostUrl = iConf.frostUrl;
        iConf.supportedFeatures.forEach(
            (f) => FeatureProvider.getInstance().getFeature(f) //Load all supported features
        );

        Configuration.instance = newConf;
    }

    // The default value for the language id
    getLanguage(): string {
        return this.language;
    }

    // The Url of the top level FROST REST API
    getFrostUrl(): string {
        return this.frostUrl;
    }
}

interface IConfig {
    frostUrl: string;
    language: string;
    supportedFeatures: string[];
}
