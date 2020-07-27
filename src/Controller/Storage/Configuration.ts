import FeatureProvider from "../FeatureProvider";

export class Configuration {
    private static instance: Configuration | null;
    private language: string = "";
    private frostUrl: string = "";

    static getInstance(): Configuration {
        if (!Configuration.instance) {
            Configuration.load();
        }
        return Configuration.instance as Configuration;
    }

    private static load() {
        var json = require("../../Jsons/config.json");
        var iConf = json as IConfig;
        if (!iConf) {
            throw new Error("Config.json has wrong format.");
        }
        var newConf = new Configuration();
        newConf.language = iConf.language;
        newConf.frostUrl = iConf.frostUrl;
        iConf.supportedFeatures.forEach((f) =>
            FeatureProvider.getInstance().getFeature(f)
        );

        Configuration.instance = newConf;
    }

    getLanguage(): string {
        return this.language;
    }

    getFrostUrl(): string {
        return this.frostUrl;
    }
}

interface IConfig {
    frostUrl: string;
    language: string;
    supportedFeatures: string[];
}
