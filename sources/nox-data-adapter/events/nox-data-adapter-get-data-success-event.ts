import { NoxDataAdapterDataResult } from "../data/nox-data-adapter-data-result";
import { NoxDataAdapterGetDataPhase } from "../enums/nox-data-adapter-get-data-phase";
import { NoxDataAdapterGetDataReason } from "../enums/nox-data-adapter-get-data-reason";

export class NoxDataAdapterGetDataSuccessEvent {
  phase: NoxDataAdapterGetDataPhase = "none";
  reason: NoxDataAdapterGetDataReason = "none";
  secondaryResults: any;
  primaryResult: any;
}
