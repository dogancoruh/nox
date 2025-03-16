import { Observable } from "rxjs";
import { NoxDataAdapterObservableInfo } from "../../nox-data-adapter/data/nox-data-adapter-observable-info";

export class NoxTreeDataAdapterGetDataEvent {
  secondaryObservableInfos: NoxDataAdapterObservableInfo<any>[] = [];
  primaryObservable$!: Observable<any>;
}
