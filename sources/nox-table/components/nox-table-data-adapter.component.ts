import { Component, EventEmitter, Input, Output, AfterViewInit, Injector, OnInit } from '@angular/core';
import { NoxPagerComponent } from '../../nox-pager/components/nox-pager/nox-pager.component';
import { NoxTableDataAdapterGetDataEvent } from '../events/nox-table-data-adapter-get-data-event';
import { NoxTableDataAdapterGetDataSuccessEvent } from '../events/nox-table-data-adapter-get-data-success-event';
import { NoxTableDataAdapterGetDataFailEvent } from '../events/nox-table-data-adapter-get-data-fail-event';
import { NoxTableAdapterSearchEvent } from '../events/nox-table-adapter-search-event';
import { NoxTableAdapterPageIndexChangedEvent } from '../events/nox-table-adapter-page-index-changed-event';
import { NoxTableAdapterActionEvent } from '../events/nox-table-adapter-action-event';
import { NoxDataAdapterGetDataReason } from '../../nox-data-adapter/enums/nox-data-adapter-get-data-reason';
import { NoxDataAdapterObservableInfo } from '../../nox-data-adapter/data/nox-data-adapter-observable-info';
import { Observable, zip } from 'rxjs';
import { NoxTableAdapterPageSizeChangedEvent } from '../events/nox-table-adapter-page-size-changed-event';
import { NoxTableActionEvent } from '../events/nox-table-action-event';
import { NoxServerDataAdapterComponent } from '../../nox-data-adapter/components/nox-server-data-adapter';
import { NoxSearchBarComponent } from '../../nox-search-bar/components/nox-search-bar.component';
import { NoxTableComponent } from './nox-table.component';

@Component({
  selector: 'nox-table-data-adapter',
  template: '',
  standalone: true,
  imports: [

  ]
})
export class NoxTableDataAdapterComponent extends NoxServerDataAdapterComponent implements AfterViewInit {
  @Input() searchBar?: NoxSearchBarComponent;
  @Input() table?: NoxTableComponent;
  @Input() pager?: NoxPagerComponent;

  @Output() onSearch: EventEmitter<NoxTableAdapterSearchEvent> = new EventEmitter<NoxTableAdapterSearchEvent>();

  @Output() onGetData: EventEmitter<NoxTableDataAdapterGetDataEvent> = new EventEmitter<NoxTableDataAdapterGetDataEvent>();
  @Output() onGetDataSuccess: EventEmitter<NoxTableDataAdapterGetDataSuccessEvent> = new EventEmitter<NoxTableDataAdapterGetDataSuccessEvent>();
  @Output() onGetDataFail: EventEmitter<NoxTableDataAdapterGetDataFailEvent> = new EventEmitter<NoxTableDataAdapterGetDataFailEvent>();

  @Output() onAction: EventEmitter<NoxTableAdapterActionEvent> = new EventEmitter<NoxTableAdapterActionEvent>();

  @Output() onPageIndexChanged: EventEmitter<NoxTableAdapterPageIndexChangedEvent> = new EventEmitter<NoxTableAdapterPageIndexChangedEvent>();
  @Output() onPageSizeChanged: EventEmitter<NoxTableAdapterPageSizeChangedEvent> = new EventEmitter<NoxTableAdapterPageSizeChangedEvent>();

  constructor(override injector: Injector) {
    super(injector);

  }

  override ngOnInit(): void {
    super.ngOnInit();

    if (this.pager)
      this.pager.urlPrefix = this.urlPrefix;
  }

  ngAfterViewInit(): void {
    if (this.searchBar) {
      this.searchBar.onSearch.subscribe((event: any) => {
        const queryParams: any = {};

        const searchBarData = this.searchBar?.data;
        for (const propertyName in searchBarData) {
          queryParams[this.getNameWithUrlPrefix(propertyName)] = searchBarData[propertyName];
        }

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParamsHandling: "merge",
          queryParams: queryParams
        }).finally(() => {
          this.onSearch.emit(event);
          this.getData();
        });
      });
    }

    if (this.table) {
      this.table.onSort.subscribe((event: any) => {
        const queryParams: any = {};
        queryParams[this.getNameWithUrlPrefix("sortColumn")] = event.sortColumnName;
        queryParams[this.getNameWithUrlPrefix("sortDirection")] = event.sortDirection;

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParamsHandling: "merge",
          queryParams: queryParams
        }).finally(() => {
          this.onPageIndexChanged.emit(event);
          this.getData();
        });
      });

      this.table.onAction.subscribe((event: NoxTableActionEvent) => {
        this.onAction.emit({
          action: event.action,
          row: event.row
        });
      });
    }

    if (this.pager) {
      this.pager.onPageIndex.subscribe((event: any) => {
        const queryParams: any = {};
        queryParams[this.getNameWithUrlPrefix("pageIndex")] = event.pageIndex;

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParamsHandling: "merge",
          queryParams: queryParams
        }).finally(() => {
          this.onPageIndexChanged.emit(event);
          this.getData();
        });
      });
      this.pager.onPageSize.subscribe((event: any) => {
        const queryParams: any = {};
        queryParams[this.getNameWithUrlPrefix("pageSize")] = event.pageSize;

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParamsHandling: "merge",
          queryParams: queryParams
        }).finally(() => {
          this.onPageSizeChanged.emit(event);
          this.getData();
        });
      });
    }

    if (this.autoGetData)
      this.getData();
  }

  getData(reason: NoxDataAdapterGetDataReason = "initial"): void {
    if (this.table) {
      this.table.errorMessage = "";
      this.table.loading = true;
      this.table.data = null;
    }

    if (this.pager)
      this.pager.pageCount = -1;

    if (this.searchBar) {
      const searchBarData = this.searchBar.data;
      for (const field of this.searchBar.fields) {
        const parameterName = field.name;
        const queryParameterName = this.getNameWithUrlPrefix(parameterName);
        if (this.activatedRoute.snapshot.queryParams[queryParameterName]) {
          searchBarData[parameterName] = this.activatedRoute.snapshot.queryParams[queryParameterName];
        }
      }
      this.searchBar.data = searchBarData;
    }

    this.onShowSpinner.emit();

    // first try to fetch lookup datas
    const getDataEvent = new NoxTableDataAdapterGetDataEvent();

    if (reason == "initial") {
      getDataEvent.phase = "secondary";
      getDataEvent.reason = reason;

      this.onGetData.emit(getDataEvent);

      if (getDataEvent.secondaryObservableInfos && getDataEvent.secondaryObservableInfos.length > 0) {
        // get search lookup observables from user
        const observableInfos$: Observable<any>[] = [];

        getDataEvent.secondaryObservableInfos.forEach((observableInfo: NoxDataAdapterObservableInfo<any>) => {
          observableInfos$.push(observableInfo.observable$);
        });

        // fetch search lookup datas
        this.subscription = zip(observableInfos$).subscribe((results: any[]) => {
          this.subscription?.unsubscribe();
          const observableResults: any = {};

          let index = 0;
          getDataEvent.secondaryObservableInfos.forEach((observableInfo: NoxDataAdapterObservableInfo<any>) => {
            observableResults[observableInfo.name] = results[index];
            index++;
          });

          const getDataSuccessEvent = new NoxTableDataAdapterGetDataSuccessEvent();
          getDataSuccessEvent.phase = "secondary";
          getDataSuccessEvent.reason = reason;
          getDataSuccessEvent.secondaryResults = observableResults;
          this.onGetDataSuccess.emit(getDataSuccessEvent);

          // get default observable from user
          this.getDefaultData(reason);
        }, (error: any[]) => {
          this.subscription?.unsubscribe();

          console.log("error", error);

          if (this.table) {
            this.table.loading = false;
            this.table.errorMessage = this.getDataFailText;
          }

          this.onHideSpinner.emit();

          const onGetDataFailEvent = new NoxTableDataAdapterGetDataFailEvent();
          onGetDataFailEvent.error = error;
          this.onGetDataFail.emit(onGetDataFailEvent);
        });
      } else {
        this.getDefaultData(reason);
      }
    } else {
      this.getDefaultData(reason);
    }
  }

  getDefaultData(reason: NoxDataAdapterGetDataReason) {
    // get default observable from user
    const getDataEvent: NoxTableDataAdapterGetDataEvent = new NoxTableDataAdapterGetDataEvent();
    getDataEvent.phase = "primary";

    if (this.searchBar)
      getDataEvent.searchParameters = this.searchBar?.data;

    if (this.table) {
      getDataEvent.sortColumn = this.table.sortColumn;
      getDataEvent.sortDirection = this.table.sortDirection;
    }

    if (this.pager) {
      this.pager.pageIndex = Number.parseInt(this.getQueryParameter("pageIndex", this.pager.pageIndex));
      this.pager.pageSize = Number.parseInt(this.getQueryParameter("pageSize", this.pager.pageSize));

      getDataEvent.pageIndex = this.pager.pageIndex;
      getDataEvent.pageSize = this.pager.pageSize;
    }

    this.onGetData.emit(getDataEvent);

    if (getDataEvent.primaryObservable$) {
      // fetch user default data
      this.subscription = getDataEvent.primaryObservable$.subscribe((result: any) => {
        this.subscription?.unsubscribe();
        this.onHideSpinner.emit();

        const getDataSuccessEvent = new NoxTableDataAdapterGetDataSuccessEvent();
        getDataSuccessEvent.phase = "primary";
        getDataSuccessEvent.reason = reason;
        getDataSuccessEvent.primaryResult = result;

        if (this.pager) {
          if (result.pageIndex != null)
            this.pager.pageIndex = result.pageIndex;
          if (result.pageCount != null)
            this.pager.pageCount = result.pageCount;
          if (result.dataCount != null)
            this.pager.recordCount = result.dataCount;

          if (this.pager?.pageIndex != 0) {
            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParamsHandling: "merge",
              queryParams: {
                pageIndex: result.pageIndex
              }
            }).finally(() => {
              if (this.table) {
                this.table.loading = false;
                this.table.data = result.data;
              }

              this.onGetDataSuccess.emit(getDataSuccessEvent);
            });
          } else {
            if (this.table) {
              this.table.loading = false;
              this.table.data = result.data;
            }

            this.onGetDataSuccess.emit(getDataSuccessEvent);
          }
        } else {
          if (this.table) {
            this.table.loading = false;
            this.table.data = result.data;

            if (reason == "initial")
              this.table.dataRefreshReason = "initial";
            else if (reason == "search")
              this.table.dataRefreshReason = "search";
          }

          this.onGetDataSuccess.emit(getDataSuccessEvent);
        }
      }, (error: any) => {
        this.subscription?.unsubscribe();

        if (this.table) {
          this.table.loading = false;
          this.table.errorMessage = this.getDataFailText;
        }

        this.onHideSpinner.emit();

        const getDataFailEvent = new NoxTableDataAdapterGetDataFailEvent();
        getDataFailEvent.phase = "primary";
        getDataFailEvent.reason = reason;
        getDataFailEvent.error = error;
        this.onGetDataFail.emit(getDataFailEvent);
      });
    } else {
      throw new Error("Default observable not defined by user");
    }
  }
}
