export default class EntityValidationResult {
    public readonly IsValid: boolean;
    public readonly Errors: string[];
   
    public constructor(isValid: boolean, errors: string[]){
        this.IsValid = isValid
        this.Errors = errors
    }
}