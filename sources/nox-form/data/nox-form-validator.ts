import { NoxFormValidatorType } from "../enums/nox-form-validator-type";

export class NoxFormValidator {
  id: string = "";
  type: NoxFormValidatorType = "none";
  firstMatchFieldName?: string | undefined;
  secondMatchFieldName?: string | undefined;
}
