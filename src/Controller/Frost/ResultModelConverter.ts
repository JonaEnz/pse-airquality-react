import { FrostResult } from "../../Model/FrostResult";

export default interface ResultModelConverter<T> {

    convert(json: any): T;

}