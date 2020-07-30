import { FrostResult } from "../../Model/FrostResult";
import FrostFactory from "./FrostFactory";
import QueryBuilder from "./QueryBuilder";

export default class FrostServer {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public getUrl(): string {
        return this.url;
    }

    public setUrl(url: string): void {
        this.url = url;
    }

    public async request<T>(
        ff: FrostFactory<T>,
        options: any
    ): Promise<FrostResult<T>> {
        let req: string = ff.getQueryBuilder().getQuery(options);
        const json: any = await fetch(this.url + req).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        });
        if (json === null) {
            return new FrostResult<T>(null, false, "fetch error");
        }
        let result: T;
        try {
            result = ff.getConverter().convert(json, options);
        } catch (error) {
            return new FrostResult<T>(null, false, error.message);
        }
        return new FrostResult<T>(result, true, "");
    }
}
