export class FrostResult<T> {
    private result: T | null; //payload of the response from the FROST server
    private success: boolean;
    private errorMessage: string;

    constructor(result: T | null, success: boolean, errorMessage: string) {
        this.result = result;
        this.success = success;
        this.errorMessage = errorMessage;
    }

    getResult(): T | null {
        return this.result;
    }

    getSuccess(): boolean {
        return this.success;
    }

    getMessage(): string {
        return this.errorMessage;
    }
}
