import { NoxFormFieldValidatorType } from "../enums/nox-form-field-validator-type";

export class NoxFormFieldValidator {
  id: string = "";
  type: NoxFormFieldValidatorType = "none";
  value: number = 0;
  pattern: string | RegExp = "";
  errorMessage?: string = "";
}
