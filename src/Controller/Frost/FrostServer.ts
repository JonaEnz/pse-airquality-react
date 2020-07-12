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

    public async request(ff: FrostFactory, options: any): Promise<FrostResult<T>> {

        let req: string = ""; //the request string should be assigned here
        const json = await fetch(this.url + req).then(response => response.json());
        const result: FrostResult = ff.getConverter().convert(json)
        return result;
    }
}