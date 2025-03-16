import { NoxDataAdapterGetDataEvent } from "../../nox-data-adapter/events/nox-data-adapter-get-data-event";
import { NoxDataAdapterGetDataPhase } from "../../nox-data-adapter/enums/nox-data-adapter-get-data-phase";
import { NoxDataAdapterGetDataReason } from "../../nox-data-adapter/enums/nox-data-adapter-get-data-reason";

export class NoxTableDataAdapterGetDataEvent extends NoxDataAdapterGetDataEvent {
  phase: NoxDataAdapterGetDataPhase = "none";
  reason: NoxDataAdapterGetDataReason = "none";

  pageIndex?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: string;

  searchParameters: any;
  getSearchParameter(name: string): any {
    if (this.searchParameters && this.searchParameters[name])
      return this.searchParameters[name];
    else
      return null;
  }
}
