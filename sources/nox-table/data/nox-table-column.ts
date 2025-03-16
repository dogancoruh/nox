import { TemplateRef } from "@angular/core";
import { NoxSortDirection } from "../../nox-core/enums/nox-sort-direction";
import { NoxTableColumnType } from "../enums/nox-table-column-type";
import { NoxTableDropDownColumnItem } from "./nox-table-dropdown-column-item";
import { NoxTableColumnHorizontalAlignment } from "../enums/nox-table-column-horizontal-alignment";

export class NoxTableColumn {
    id: string = "";
    name: string = "";
    type: NoxTableColumnType = "none"
    title: string = "";
    
    columnClass?: string | string[] | undefined = undefined;
    headerClass?: string | string[] | undefined = undefined;
    cellClass?: string | string[] | undefined = undefined;

    dropDownItems?: any;

    colorTrue?: string = "#198754";
    colorFalse?: string = "#dc3545";
    iconTrue?: any;
    iconFalse?: any;
    textTrue?: string = "";
    textFalse?: string = "";

    sortable?: boolean = false;
    selectable?: boolean = false;

    imageLinkPrefix?: string = "";

    dateFormat?: string = "";
    timeFormat?: string = "";
    dateTimeFormat?: string = "";

    ellipsisLength?: number = 100;

    showValueDropDownNotMatching?: boolean = false;

    template?: TemplateRef<any>;

    horizontalAlignment: NoxTableColumnHorizontalAlignment = "left";

    width?: string = undefined;

    visible?: boolean = true;
}
