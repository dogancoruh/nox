import { NoxFormButton } from "../data/nox-form-button";

export class NoxFormButtonEvent {
    button: NoxFormButton | undefined;
    data: any;
    dirty: boolean | undefined;
}