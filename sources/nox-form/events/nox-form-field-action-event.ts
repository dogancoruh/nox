import { NoxFormField } from "../data/nox-form-field";
import { NoxFormFieldAction } from "../data/nox-form-field-action";

export class NoxFormFieldActionEvent {
    action!: NoxFormFieldAction;
    field!: NoxFormField;
}