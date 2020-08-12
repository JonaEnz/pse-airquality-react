import { FrostResult } from "../../Model/FrostResult";
import FrostFactory from "./FrostFactory";

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
        //get query from query builder
        let query: string = ff.getQueryBuilder().getQuery(options);

        //fetch response
        let response: Response = await fetch(this.url + query);
        if (!response.ok) {
            //something went wrong in the fetching process
            return new FrostResult<T>(
                null,
                false,
                `Fetching Error: ${response.status} ${response.statusText}`
            );
        }

        //convert response to json
        let json: JSON = await response.json();

        try {
            //get type specific json converter
            let converter = ff.getConverter();
            //convert json to specific objects
            let result: T = converter.convert(json, options);

            return new FrostResult<T>(result, true, "No error occured");
        } catch (error) {
            //something went wrong in the convertion process
            return new FrostResult<T>(null, false, (error as Error).message);
        }
    }
}
