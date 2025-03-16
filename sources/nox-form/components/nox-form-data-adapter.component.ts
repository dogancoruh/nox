import { AfterViewInit, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { NoxFormComponent } from './nox-form.component';
import { NoxFormDataAdapterGetDataEvent } from '../events/nox-form-data-adapter-get-data-event';
import { NoxFormDataAdapterGetDataSuccessEvent } from '../events/nox-form-data-adapter-get-data-success-event';
import { NoxFormDataAdapterGetDataFailEvent } from '../events/nox-form-data-adapter-get-data-fail-event';
import { NoxDataAdapterObservableInfo } from '../../nox-data-adapter/data/nox-data-adapter-observable-info';
import { NoxFormDataAdapterSetDataEvent } from '../events/nox-form-data-adapter-set-data-event';
import { NoxFormDataAdapterSetDataSuccessEvent } from '../events/nox-form-data-adapter-set-data-success-event';
import { NoxFormDataAdapterSetDataFailEvent } from '../events/nox-form-data-adapter-set-data-fail-event';
import { NoxDataAdapterErrorInfo } from '../../nox-data-adapter/data/nox-data-adapter-error-info';
import { NoxServerDataAdapterComponent } from '../../nox-data-adapter/components/nox-server-data-adapter';

@Component({
  selector: 'nox-form-data-adapter',
  template: ""
})
export class NoxFormDataAdapterComponent extends NoxServerDataAdapterComponent implements AfterViewInit {
  @Input() form!: NoxFormComponent;

  @Input() onSetDataSuccessRouterLink: [] | string = "";

  @Output() onGetData: EventEmitter<NoxFormDataAdapterGetDataEvent> = new EventEmitter<NoxFormDataAdapterGetDataEvent>();
  @Output() onGetDataSuccess: EventEmitter<NoxFormDataAdapterGetDataSuccessEvent> = new EventEmitter<NoxFormDataAdapterGetDataSuccessEvent>();
  @Output() onGetDataFail: EventEmitter<NoxFormDataAdapterGetDataFailEvent> = new EventEmitter<NoxFormDataAdapterGetDataFailEvent>();

  @Output() onSetData: EventEmitter<NoxFormDataAdapterSetDataEvent> = new EventEmitter<NoxFormDataAdapterSetDataEvent>();
  @Output() onSetDataSuccess: EventEmitter<NoxFormDataAdapterSetDataSuccessEvent> = new EventEmitter<NoxFormDataAdapterSetDataSuccessEvent>();
  @Output() onSetDataFail: EventEmitter<NoxFormDataAdapterSetDataFailEvent> = new EventEmitter<NoxFormDataAdapterSetDataFailEvent>();

  constructor(override injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {
    if (this.form) {
      this.form.onSubmit.subscribe((event: any) => {
        this.setData(event.data);
      });
    }

    if (this.autoGetData)
      this.getData();
  }

  getData(): void {
    this.onShowSpinner.emit();

    const getDataEvent: NoxFormDataAdapterGetDataEvent = new NoxFormDataAdapterGetDataEvent();

    this.onGetData.emit(getDataEvent);

    // populate observables into an array for zip function
    const observables$: Observable<any>[] = [];

    getDataEvent.secondaryObservableInfos.forEach((observableInfo: NoxDataAdapterObservableInfo<any>) => {
      observables$.push(observableInfo.observable$);
    });

    if (getDataEvent.primaryObservable$)
      observables$.push(getDataEvent.primaryObservable$);

    if (observables$.length > 0) {
      this.subscription = zip(observables$).subscribe((results: any[]) => {
        this.subscription?.unsubscribe();

        const secondaryResults: any = {};

        let index = 0;
        getDataEvent.secondaryObservableInfos.forEach((observableInfo: NoxDataAdapterObservableInfo<any>) => {
          secondaryResults[observableInfo.name] = results[index];
          index++;
        });

        let primaryResult: any = undefined;
        if (results.length > getDataEvent.secondaryObservableInfos.length)
          primaryResult = results[results.length - 1];

        if (this.form)
          this.form.data = primaryResult;

        this.onHideSpinner.emit();

        const onGetDataSuccessEvent = new NoxFormDataAdapterGetDataSuccessEvent();
        onGetDataSuccessEvent.secondaryResults = secondaryResults;
        onGetDataSuccessEvent.primaryResult = primaryResult;
        this.onGetDataSuccess.emit(onGetDataSuccessEvent);
      }, (error: any) => {
        this.onHideSpinner.emit();

        const errorInfos: NoxDataAdapterErrorInfo[] = [];

        const onGetDataFailEvent = new NoxFormDataAdapterGetDataFailEvent();
        onGetDataFailEvent.error = error;
        this.onGetDataFail.emit(onGetDataFailEvent);
      });
    } else {
      this.onHideSpinner.emit();
      this.onGetDataFail.emit();
    }
  }

  setData(data: any) {
    this.onShowSpinner.emit();

    const setDataEvent = new NoxFormDataAdapterSetDataEvent();
    setDataEvent.data = data;

    this.onSetData.emit(setDataEvent);

    if (setDataEvent.result$) {
      if (this.subscription)
        this.subscription.unsubscribe();

      this.subscription = setDataEvent.result$.subscribe((result: any) => {
        this.onHideSpinner.emit();
        this.onSetDataSuccess.emit();

        // navigate to given url if success link is defined
        if (this.onSetDataSuccessRouterLink)
          this.router.navigate([this.onSetDataSuccessRouterLink]);
      }, (error: any) => {
        this.onHideSpinner.emit();
        this.onSetDataFail.emit({
          error: error
        });
      });
    } else {
      throw new Error("onSetData > result$ not handled");
    }
  }
}
