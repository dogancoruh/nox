import { Component, EventEmitter, Input, Output, AfterViewInit, ChangeDetectorRef, Injector } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { NoxTreeComponent } from './nox-tree.component';
import { NoxTreeDataAdapterGetDataEvent } from '../events/nox-tree-data-adapter-get-data-event';
import { NoxTreeDataAdapterGetDataSuccsessEvent } from '../events/nox-tree-data-adapter-get-data-success-event';
import { NoxTreeDataAdapterGetDataFailEvent } from '../events/nox-tree-data-adapter-get-data-fail-event';
import { NoxTreeDataAdapterActionEvent } from '../events/nox-tree-data-adapter-action-event';
import { NoxDataAdapterObservableInfo } from '../../nox-data-adapter/data/nox-data-adapter-observable-info';
import { NoxDataAdapterGetDataReason } from '../../nox-data-adapter/enums/nox-data-adapter-get-data-reason';
import { NoxServerDataAdapterComponent } from '../../nox-data-adapter/components/nox-server-data-adapter';

@Component({
  selector: 'nox-tree-data-adapter',
  template: ''
})
export class NoxTreeDataAdapterComponent extends NoxServerDataAdapterComponent implements AfterViewInit {
  @Input() tree?: NoxTreeComponent;
  
  @Output() onGetData: EventEmitter<NoxTreeDataAdapterGetDataEvent> = new EventEmitter<NoxTreeDataAdapterGetDataEvent>();
  @Output() onGetDataSuccess: EventEmitter<NoxTreeDataAdapterGetDataSuccsessEvent> = new EventEmitter<NoxTreeDataAdapterGetDataSuccsessEvent>();
  @Output() onGetDataFail: EventEmitter<NoxTreeDataAdapterGetDataFailEvent> = new EventEmitter<NoxTreeDataAdapterGetDataFailEvent>();

  @Output() onAction: EventEmitter<NoxTreeDataAdapterActionEvent> = new EventEmitter<NoxTreeDataAdapterActionEvent>();

  constructor(override injector: Injector) {
    super(injector);
  }

  ngAfterViewInit(): void {
    if (this.autoGetData)
      this.getData();
  }

  getData(reason: NoxDataAdapterGetDataReason = "initial"): void {
    if (this.tree) {
        this.tree.dataRefreshReason = reason;

      this.tree.loading = true;
      this.tree.data = null;
    }

    this.onShowSpinner.emit();

    // first try to fetch lookup datas
    const getDataEvent = new NoxTreeDataAdapterGetDataEvent();

    this.onGetData.emit(getDataEvent);

    // get search lookup observables from user
    const observableInfos$: Observable<any>[] = [];

    getDataEvent.secondaryObservableInfos.forEach((observableInfo: NoxDataAdapterObservableInfo<any>) => {
      observableInfos$.push(observableInfo.observable$);
    });

    if (getDataEvent.primaryObservable$)
      observableInfos$.push(getDataEvent.primaryObservable$);

    if (observableInfos$.length > 0) {
      // fetch search lookup datas
      this.subscription = zip(observableInfos$).subscribe((results: any[]) => {
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

        if (this.tree) {
          this.tree.loading = false;
          this.tree.data = primaryResult;
          //this.changeDetectorRef.detectChanges();
        }

        this.onHideSpinner.emit();

        const getDataSuccessEvent = new NoxTreeDataAdapterGetDataSuccsessEvent();
        getDataSuccessEvent.secondaryResults = secondaryResults;
        getDataSuccessEvent.primaryResult = null;
        this.onGetDataSuccess.emit(getDataSuccessEvent);
      }, (errors: any[]) => {
        this.subscription?.unsubscribe();

        console.log("error", errors);

        if (this.tree) {
          this.tree.loading = false;
          this.tree.errorMessage = this.getDataFailText;
        }

        this.onHideSpinner.emit();

        const onGetDataFailEvent = new NoxTreeDataAdapterGetDataFailEvent();
        onGetDataFailEvent.errors = errors;
        this.onGetDataFail.emit(onGetDataFailEvent);
      });
    } else {
      if (this.tree) {
        this.tree.loading = false;
        this.tree.errorMessage = "observable_not_defined";

        throw new Error("Observable not defined for nox-tree-data-adapter");
      }
    }
  }
}
