import { Observable } from "rxjs";
import { NoxDataAdapterObservableInfo } from "../data/nox-data-adapter-observable-info";

export class NoxDataAdapterSetDataEvent {
  data: any;
  result$!: Observable<any>;
}
