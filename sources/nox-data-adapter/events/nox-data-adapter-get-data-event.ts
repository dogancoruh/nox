import { Observable } from 'rxjs';
import { NoxDataAdapterObservableInfo } from '../data/nox-data-adapter-observable-info';

export class NoxDataAdapterGetDataEvent {
  secondaryObservableInfos: NoxDataAdapterObservableInfo<any>[] = [];
  primaryObservable$!: Observable<any>;
}
