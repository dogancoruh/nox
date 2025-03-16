import { AfterViewInit, Component, Injector, ViewChild } from "@angular/core";
import { NoxSearchBarComponent } from "../../../nox-search-bar/components/nox-search-bar.component";
import { NoxTableComponent } from "../../../nox-table/components/nox-table.component";
import { NoxPagerComponent } from "../../../nox-pager/components/nox-pager/nox-pager.component";
import { NoxPageComponent } from "./nox-page.component";
import { NoxTableDataAdapterComponent } from '../../../nox-table/components/nox-table-data-adapter.component';

@Component({
  selector: "nox-table-page-component",
  template: ""
})
export class NoxTablePageComponent extends NoxPageComponent implements AfterViewInit {
  @ViewChild(NoxSearchBarComponent) searchBar!: NoxSearchBarComponent;
  @ViewChild(NoxTableComponent) table!: NoxTableComponent;
  @ViewChild(NoxPagerComponent) pager!: NoxPagerComponent;
  @ViewChild(NoxTableDataAdapterComponent) tableAdapter!: NoxTableDataAdapterComponent;

  constructor(override injector: Injector) {
    super(injector);
  }

  override ngAfterContentInit(): void {
    super.ngAfterContentInit();

    if (this.searchBar) {
      this.searchBar.onSearch.subscribe((searchParameters: any) => {
        this.tableAdapter.getData("search");
      });
      if (this.tableAdapter)
        this.tableAdapter.searchBar = this.searchBar;
    }

    if (this.pager) {
      this.pager.onPageSize.subscribe((event: any) => {
        if (this.tableAdapter)
          this.tableAdapter.getData("pager");
      });
      this.pager.onPageIndex.subscribe((event: any) => {
        if (this.tableAdapter)
          this.tableAdapter.getData("pager");
      });
    }

    if (this.tableAdapter) {
      if (this.searchBar)
        this.tableAdapter.searchBar = this.searchBar;
      if (this.table)
        this.tableAdapter.table = this.table;
      if (this.pager)
        this.tableAdapter.pager = this.pager;
    }
  }

  setPageSize(pageSize: number) {
    this.userPageSettingsService.setInteger("pager_page_size", pageSize);
  }

  getPageSize(): number {
    return this.userPageSettingsService.getInteger("pager_page_size");
  }
}