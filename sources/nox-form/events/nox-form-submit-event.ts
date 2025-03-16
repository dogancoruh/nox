import { NoxFormButton } from "../data/nox-form-button";

export class NoxFormSubmitEvent {
    button: NoxFormButton | undefined;
    data: any;
    dirty: boolean | undefined;
}