import { TemplateRef } from "@angular/core";
import { NoxTableActionButtonType } from "../enums/nox-table-action-button-type";
import { NoxTableActionDisplayType } from "../enums/nox-table-action-display-type";

export class NoxTableAction {
    name: string = "";
    title: string = "";
    link: string = "";
    isContext: boolean = true;
    buttonType: NoxTableActionButtonType = "button";
    isBatch?: boolean = false;
    hasDivider?: boolean = false;
    template?: TemplateRef<any>;
    enabled?: boolean = true; 
}
