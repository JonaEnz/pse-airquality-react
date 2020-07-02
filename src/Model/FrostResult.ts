export class FrostResult<T> {
  private result: T | null;
  private success: boolean;
  private errorMessage: string;

  constructor(result: T | null, success: boolean, errorMessage: string) {
    if (success || !result) {
      //object is not null or success
      this.result = result;
      this.success = true;
      this.errorMessage = "";
    } else {
      //object is null and no success
      this.result = null;
      this.success = false;
      this.errorMessage = errorMessage;
    }
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
