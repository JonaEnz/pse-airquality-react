import ResultModelConverter from "./ResultModelConverter";

export default abstract class FrostFactory {

    private rmc: ResultModelConverter<T>;

    public getConverter(): ResultModelConverter<T> {
        return this.rmc;
    }

    getQueryBuilder(): any;
}