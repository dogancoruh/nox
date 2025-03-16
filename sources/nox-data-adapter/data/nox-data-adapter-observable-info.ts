import { Observable, Subscribable } from "rxjs";

export class NoxDataAdapterObservableInfo<T> {
  name!: string;
  observable$!: Observable<T>;
}
