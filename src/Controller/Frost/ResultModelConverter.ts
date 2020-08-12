export default interface ResultModelConverter<T> {
    //converts a json object to a higher class object
    convert(json: any, options: any): T;
}
