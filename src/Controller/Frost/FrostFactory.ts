import ResultModelConverter from "./ResultModelConverter";
import QueryBuilder from "./QueryBuilder";

export default abstract class FrostFactory<T> {
    private rmc: ResultModelConverter<T>;
    private qb: QueryBuilder;

    constructor(rmc: ResultModelConverter<T>, qb: QueryBuilder) {
        this.rmc = rmc;
        this.qb = qb;
    }

    public getConverter(): ResultModelConverter<T> {
        return this.rmc;
    }

    public getQueryBuilder(): QueryBuilder {
        return this.qb;
    }
}
