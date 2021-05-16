import FieldError from "./FieldError";

export default class EntityValidationResult {
  public readonly IsValid: boolean;
  public readonly Errors: FieldError[];

  public constructor(isValid: boolean, errors: FieldError[]) {
    this.IsValid = isValid;
    this.Errors = errors;
  }
}
