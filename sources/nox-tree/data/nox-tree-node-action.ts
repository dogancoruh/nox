import { TemplateRef } from "@angular/core";
import { IdHelper } from "../../nox-core/classes/id-helper";
import { NoxTreeNodeStandartActionType } from "../enums/nox-tree-node-standart-action-type";

export class NoxTreeNodeAction {
    id: string = "";
    name: string = "";
    title?: string = "";
    icon?: any = null;
    standartAction?: NoxTreeNodeStandartActionType = "none";
    isContext?: boolean = true;
    hasDivider?: boolean = false;
    link?: string = "";
    template?: TemplateRef<any>;
    enabled?: boolean = true;
}