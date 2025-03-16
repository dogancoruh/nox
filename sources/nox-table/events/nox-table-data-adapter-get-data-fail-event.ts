import { NoxDataAdapterGetDataFailEvent } from "../../nox-data-adapter/events/nox-data-adapter-get-data-fail-event";
import { NoxDataAdapterGetDataPhase } from "../../nox-data-adapter/enums/nox-data-adapter-get-data-phase";
import { NoxDataAdapterGetDataReason } from "../../nox-data-adapter/enums/nox-data-adapter-get-data-reason";

export class NoxTableDataAdapterGetDataFailEvent extends NoxDataAdapterGetDataFailEvent {
  phase: NoxDataAdapterGetDataPhase = "none";
  reason: NoxDataAdapterGetDataReason = "none";
}
