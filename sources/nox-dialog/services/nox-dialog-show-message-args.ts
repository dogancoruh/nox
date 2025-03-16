import { DialogIcon } from "../dialog/nox-dialog-icon"
import { DialogButton } from "../dialog/nox-dialog-button";
import { DialogResult } from "../dialog/nox-dialog-result";

export class NoxDialogShowMessageArgs {
    size?: string = "sm";
    backdrop?: "static";
    keyboard?: boolean = false;
    icon?: DialogIcon =  DialogIcon.None;
    buttons?: DialogButton =  DialogButton.Ok;
    closeCallback?: (result: DialogResult) => void;
}