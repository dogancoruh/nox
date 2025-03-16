import { Observable } from 'rxjs';

export class NoxFormDataAdapterSetDataEvent {
  data: any;
  result$!: Observable<any>;
}
