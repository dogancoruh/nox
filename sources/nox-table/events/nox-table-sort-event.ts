import { NoxSortDirection } from "../../nox-core/enums/nox-sort-direction";

export class NoxTableSortEvent {
    sortColumnName!: string;
    sortDirection!: NoxSortDirection;
}