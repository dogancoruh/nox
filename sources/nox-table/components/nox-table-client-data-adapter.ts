import { Component, EventEmitter, Injector, Input, Output } from "@angular/core";
import { NoxTableComponent } from "./nox-table.component";
import { NoxPagerComponent } from "../../nox-pager/components/nox-pager/nox-pager.component";
import { NoxSearchBarComponent } from "../../nox-search-bar/components/nox-search-bar.component";
import { NoxTableAdapterSearchEvent } from "../events/nox-table-adapter-search-event";
import { NoxTableAdapterActionEvent } from "../events/nox-table-adapter-action-event";
import { NoxTableAdapterPageIndexChangedEvent } from "../events/nox-table-adapter-page-index-changed-event";
import { NoxTableAdapterPageSizeChangedEvent } from "../events/nox-table-adapter-page-size-changed-event";
import { NoxDataAdapterComponent } from "../../nox-data-adapter/components/nox-data-adapter.component";
import { Subscription } from "rxjs";
import { NoxSortDirection } from "../../nox-core/enums/nox-sort-direction";
import { NoxTableSelectAllEvent } from "../events/nox-table-select-all-event";

@Component({
    selector: 'nox-table-client-data-adapter',
    template: ''
})
export class NoxTableClientDataAdapter extends NoxDataAdapterComponent {
    private tableOnSortSubscription: Subscription | undefined;
    private tableOnSelectAllSubscription: Subscription | undefined;

    private pagerOnPageIndexSubscription: Subscription | undefined;
    private pagerOnPageSizeSubscription: Subscription | undefined;

    private sortColumn: string | null = null;
    private sortDirection: NoxSortDirection = "none";

    private _data: any[] | null = null;

    @Input() get data(): any[] | null {
        return this._data;
    }
    set data(value: any[] | null) {
        this._data = value;

        if (this._pager) {
            this._pager.pageIndex = 0;
        }

        this.refreshData();
    }

    @Input() searchBar!: NoxSearchBarComponent;

    private _table: NoxTableComponent | null = null;

    @Input()
    get table(): NoxTableComponent | null {
        return this._table;
    }
    set table(value: NoxTableComponent | null) {
        if (this.tableOnSortSubscription)
            this.tableOnSortSubscription.unsubscribe();

        this._table = value;

        if (this._table) {
            this.sortColumn = this._table.sortColumn;
            this.sortDirection = this._table.sortDirection;

            this.tableOnSortSubscription = this._table.onSort.subscribe((event: any) => {
                this.sortColumn = event.sortColumnName;
                this.sortDirection = event.sortDirection;

                this.refreshData();
            });

            this.tableOnSelectAllSubscription = this._table.onSelectAll.subscribe((event: NoxTableSelectAllEvent) => {
                if (event.checked) {
                    if (this._table) 
                        this._table.setSelectedItemsForAdapter(this._data);
                } else {
                    if (this._table)
                        this._table.setSelectedItemsForAdapter(null);
                }
            });
        }
    }

    private _pager: NoxPagerComponent | null = null;

    @Input()
    get pager(): NoxPagerComponent | null {
        return this._pager;
    }
    set pager(value: NoxPagerComponent | null) {
        if (this.pagerOnPageIndexSubscription)
            this.pagerOnPageIndexSubscription.unsubscribe();

        if (this.pagerOnPageSizeSubscription)
            this.pagerOnPageSizeSubscription.unsubscribe();

        this._pager = value;

        if (this._pager) {
            this.pagerOnPageIndexSubscription = this._pager?.onPageIndex.subscribe((event: any) => {
                this._pager!.pageIndex = event.pageIndex;

                this.refreshData();
            });

            this.pagerOnPageSizeSubscription = this._pager?.onPageSize.subscribe((event: any) => {
                this._pager!.pageSize = event.pageSize;

                this.refreshData();
            });
        }
    }

    @Output() onSearch: EventEmitter<NoxTableAdapterSearchEvent> = new EventEmitter<NoxTableAdapterSearchEvent>();

    @Output() onAction: EventEmitter<NoxTableAdapterActionEvent> = new EventEmitter<NoxTableAdapterActionEvent>();

    @Output() onPageIndexChanged: EventEmitter<NoxTableAdapterPageIndexChangedEvent> = new EventEmitter<NoxTableAdapterPageIndexChangedEvent>();
    @Output() onPageSizeChanged: EventEmitter<NoxTableAdapterPageSizeChangedEvent> = new EventEmitter<NoxTableAdapterPageSizeChangedEvent>();

    constructor(override injector: Injector) {
        super(injector);
    }

    override ngOnInit(): void {
        super.ngOnInit();

        this.refreshData();
    }

    refreshData() {
        if (this._data && this._pager) {
            this._pager.pageCount = Math.ceil(this._data.length / this._pager.pageSize);
        }

        if (this.table) {
            this.table.setDataForAdapter(this._data, this.getPageData());
        }
    }

    getPageData(): any[] | null {
        let sortedData = this.sortData();

        if (sortedData && this.pager) {
            const startIndex = this.pager.pageIndex * this.pager.pageSize;
            const endIndex = startIndex + this.pager.pageSize;
            return sortedData.slice(startIndex, endIndex) ?? null;
        } else {
            return sortedData;
        }
    }

    sortData(): any[] | null {
        let result: any[] | null = null;

        if (this._data) {
            result = [];
            for (let i = 0; i < this._data?.length; i++) {
                result.push(this._data[i]);
            }

            result = result.sort((a, b) => {
                if (this.sortColumn && a[this.sortColumn] && b[this.sortColumn]) {
                    if (this.sortDirection == "ascending")
                        return a[this.sortColumn] < b[this.sortColumn] ? -1 : 1;
                    else
                        return a[this.sortColumn] > b[this.sortColumn] ? -1 : 1;
                } else {
                    return 0;
                }
            })
        }

        return result;
    }
}