import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NoxTableColumn } from '../data/nox-table-column';
import { NoxTableColumnsComponent } from './nox-table-columns.component';
import { NoxTableActionsComponent } from './nox-table-actions.component';
import { NoxTableAction } from '../data/nox-table-action';
import { Router, RouterModule } from '@angular/router';
import { NoxSortDirection } from '../../nox-core/enums/nox-sort-direction';
import { faCaretDown, faCaretUp, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { LinkHelper } from '../../nox-core/classes/link-helper';
import { NoxTableDataRefreshReason } from '../enums/nox-table-data-refresh-reason';
import { NoxConfigurationService } from '../../nox-core/services/nox-configuration.service';
import { NoxTableSortEvent } from '../events/nox-table-sort-event';
import { NoxTableActionEvent } from '../events/nox-table-action-event';
import { NoxTableMultiselectChangeEvent } from '../events/nox-table-multicelect-change-event';
import { NoxTableSelectionMode } from '../enums/nox-table-selection-mode';
import { NoxTableSelectEvent } from '../events/nox-table-select-event';
import { NoxTableSelectAllEvent } from '../events/nox-table-select-all-event';
import { NoxDateTimeService } from '../../nox-core/services/nox-date-time.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nox-table',
  templateUrl: './nox-table.component.html',
  styleUrls: ['./nox-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ]
})
export class NoxTableComponent implements AfterContentInit, AfterViewInit {
  @ContentChild(NoxTableColumnsComponent) columnsComponent!: NoxTableColumnsComponent;
  @ContentChild(NoxTableActionsComponent) actionsComponent!: NoxTableActionsComponent;

  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  @Input() iconActionContextMenuButton: any = faEllipsisV;

  dataRefreshReason: NoxTableDataRefreshReason = "none";

  @Input() columns: NoxTableColumn[] = [];
  @Input() actions: NoxTableAction[] = [];

  private selectedKeys: string[] = [];

  private _selectedItems: any[] | null = [];

  get selectedItems(): any[] | null {
    return this.getSelectedItems();
  }
  @Input() set selectedItems(value: any[] | null) {
    this._selectedItems = value;
    this.setSelectedItems();
  }

  get selectedItem(): any {
    const selectedItems = this.getSelectedItems();
    if (selectedItems && selectedItems.length > 0)
      return selectedItems[0];
    else
      return null;
  }
  @Input() set selectedItem(value: any) {
    this._selectedItems = [value];
    this.setSelectedItems();
  }

  private _rawData: any | null = null;

  private _data: any | null = null;

  get data(): any | null {
    return this._data;
  }
  @Input() set data(value: any) {
    this._data = value;
    this._rawData = value;

    this.setSelectedItems();

    this.changeDetectorRef.detectChanges();
  }

  @Input() loadingText: string = "Loading...";
  @Input() loading: boolean = false;
  @Input() initialEmptyDataMessage: string = "There is no record yet.";
  @Input() searchEmptyDataMessage: string = "No record found for search parameters.";
  @Input() errorMessage: string = "";
  @Input() selectionMode: NoxTableSelectionMode = "none";

  @Input() keyFieldName: string = "id";

  @Input() sortColumn: string = "";
  @Input() sortDirection: NoxSortDirection = "ascending";

  @Input() maxTextLength: number = 15;

  @Input() emptyIcon: string = "nox/table/empty-icon.svg";

  @Output() onSort = new EventEmitter<NoxTableSortEvent>();
  @Output() onSelect = new EventEmitter<NoxTableSelectEvent>();
  @Output() onAction = new EventEmitter<NoxTableActionEvent>();
  @Output() onMultiCheckChanged = new EventEmitter<NoxTableMultiselectChangeEvent>();
  @Output() onSelectAll = new EventEmitter<NoxTableSelectAllEvent>();

  constructor(private elementRef: ElementRef, private router: Router,
    private readonly configurationService: NoxConfigurationService,
    private readonly dateTimeService: NoxDateTimeService,
    private readonly changeDetectorRef: ChangeDetectorRef) {
    this.initialEmptyDataMessage = this.configurationService.tableInitialEmptyText;
    this.searchEmptyDataMessage = this.configurationService.tableSearchEmptyText;
    this.loadingText = this.configurationService.tableLoadingText;
  }

  ngAfterContentInit(): void {
    if (this.columnsComponent != null) {
      this.columnsComponent.onChange.subscribe((changes: SimpleChanges) => {
        this.columns = this.columnsComponent.columns;
      });

      this.columns = this.columnsComponent.columns;
    }

    if (this.actionsComponent != null)
      this.actions = this.actionsComponent.actions;
  }

  ngAfterViewInit(): void {
    this.iconActionContextMenuButton = this.configurationService.tableActionContextButtonIcon;
  }

  onActionClicked(event: any, action: NoxTableAction, row: any) {
    this.onAction.emit({
      action: action,
      row: row
    });
  }

  onSelectAllRowsCheckBoxInput(event: any) {
    let rowCheckboxes = this.elementRef.nativeElement.getElementsByClassName("row-checkbox");

    var hasUnchecked = false;
    for (var i = 0; i < rowCheckboxes.length; i++) {
      if (!rowCheckboxes[i].checked) {
        hasUnchecked = true;
        break;
      }
    }

    if (event.target.checked) {
      if (hasUnchecked) {
        for (var i = 0; i < rowCheckboxes.length; i++) {
          rowCheckboxes[i].checked = true;

          const item = this._data[i];
          if (item[this.keyFieldName]) {
            if (!this.selectedKeys.includes(item[this.keyFieldName])) {
              this.selectedKeys.push(item[this.keyFieldName]);
            }
          }

          this.onMultiCheckChanged.emit({
            checked: true,
            item: item
          });
        }
      } else {
        for (var i = 0; i < rowCheckboxes.length; i++) {
          rowCheckboxes[i].checked = true;

          const item = this._data[i];
          if (item[this.keyFieldName]) {
            if (!this.selectedKeys.includes(item[this.keyFieldName])) {
              this.selectedKeys.push(item[this.keyFieldName]);
            }
          }

          this.onMultiCheckChanged.emit({
            checked: true,
            item: item
          });
        }
      }
    } else {
      for (var i = 0; i < rowCheckboxes.length; i++) {
        rowCheckboxes[i].checked = false;

        const item = this._data[i];
        if (item[this.keyFieldName]) {
          if (this.selectedKeys.includes(item[this.keyFieldName])) {
            const keyIndex = this.selectedKeys.indexOf(item[this.keyFieldName]);
            if (keyIndex != -1)
              this.selectedKeys.splice(keyIndex, 1);
          }
        }

        this.onMultiCheckChanged.emit({
          checked: false,
          item: item
        });
      }
    }

    this.onSelectAll.emit({
      checked: event.target.checked
    });
  }

  onRowRadioInput(event: any, rowIndex: number) {
    const radio = event.target;

    if (radio.checked) {
      this.selectedKeys = [];

      const item = this._data[rowIndex];
      if (item[this.keyFieldName]) {
        this.selectedKeys.push(item[this.keyFieldName]);
      }
    }
  }

  onRowCheckboxInput(event: any, rowIndex: number) {
    const checkbox = event.target;

    const item = this._data[rowIndex];

    if (checkbox.checked) {
      if (item[this.keyFieldName]) {
        if (!this.selectedKeys.includes(item[this.keyFieldName])) {
          this.selectedKeys.push(item[this.keyFieldName]);
        }
      }
    } else {
      if (item[this.keyFieldName]) {
        if (this.selectedKeys.includes(item[this.keyFieldName])) {
          const keyIndex = this.selectedKeys.indexOf(item[this.keyFieldName]);
          if (keyIndex != -1)
            this.selectedKeys.splice(keyIndex, 1);
        }
      }
    }

    //const rowCheckboxes = this.elementRef.nativeElement.getElementsByClassName("row-checkbox");

    var allChecked = true;
    for (var i = 0; i < this._rawData.length; i++) {
      const item = this._rawData[i];
      if (!this.selectedKeys.includes(item[this.keyFieldName])) {
        allChecked = false;
        break;
      }
    }

    let selectAllRowsCheckbox = this.elementRef.nativeElement.getElementsByClassName("select-all-rows-checkbox")[0];
    selectAllRowsCheckbox.checked = allChecked;

    this.onMultiCheckChanged.emit({
      checked: checkbox.checked,
      item: item
    });
  }

  onActionButtonClicked(event: any, action: NoxTableAction, row: any) {
    this.onAction.emit({
      action: action,
      row: row
    });
  }

  getCheckBoxColumnValue(row: any, column: NoxTableColumn): boolean {
    let value = "";
    if (row && row[column.name])
      value = row[column.name].toString();
    return value.toLowerCase() == "true";
  }

  getMacthingDropDownItemValue(column: NoxTableColumn, value: any): string {
    if (column.dropDownItems[value]) {
      return column.dropDownItems[value];
    } else {
      if (column.showValueDropDownNotMatching)
        return value;
      else
        return column.dropDownItems[value];
    }
  }

  getActionLink(action: NoxTableAction, data: any): string[] | null {
    let result: string[] | null = null;

    if (action.link) {
      result = [];

      let link = action.link;

      link = LinkHelper.processUrlData(link, data);
      link = LinkHelper.processUrlQueryParams(link, data);

      const queryParamsIndex = link.indexOf("?");
      if (queryParamsIndex != -1)
        link = link.substring(0, queryParamsIndex);

      result.push(link);
    }

    return result;
  }

  getActionLinkQueryParams(action: NoxTableAction, data: any): any {
    const result: any = {};

    if (action.link) {
      let link = action.link;

      link = LinkHelper.processUrlData(link, data);
      link = LinkHelper.processUrlQueryParams(link, data);

      const queryParamsIndex = link.indexOf("?");
      if (queryParamsIndex != -1)
        link = link.substring(queryParamsIndex + 1, link.length);

      const queryParams = link.split("&");
      for (let i = 0; i < queryParams.length; i++) {
        const queryParam = queryParams[i];
        const queryParamEqualsIndex = queryParam.indexOf("=");
        if (queryParamEqualsIndex != -1) {
          const queryParamName = queryParam.substring(0, queryParamEqualsIndex);
          const queryParamValue = queryParam.substring(queryParamEqualsIndex + 1, link.length);

          result[queryParamName] = queryParamValue;
        }
      }
    }

    return result;
  }

  onColumnHeaderClicked(event: any, column: NoxTableColumn) {
    if (column.name == this.sortColumn) {
      if (this.sortDirection == "ascending")
        this.sortDirection = "descending";
      else
        this.sortDirection = "ascending";
    } else {
      this.sortColumn = column.name;
      this.sortDirection = "ascending";
    }

    this.onSort.emit({
      sortColumnName: this.sortColumn,
      sortDirection: this.sortDirection
    });
  }

  onRowColumnSelected(column: any, row: any) {
    this.onSelect.emit({
      column: column,
      row: row
    });
  }

  hasContextAction(row: any): boolean {
    for (let i = 0; i < this.actions.length; i++) {
      const action = this.actions[i];
      if (action.isContext && this.isActionVisible(action, row))
        return true;
    }

    return false;
  }

  getNonContextActions(): NoxTableAction[] {
    let result: NoxTableAction[] = [];

    this.actions.forEach((action: NoxTableAction) => {
      if (!action.isContext)
        result.push(action);
    });

    return result;
  }

  getNonBatchContextActions(): NoxTableAction[] {
    let result: NoxTableAction[] = [];

    this.actions.forEach((action: NoxTableAction) => {
      if (action.isContext && !action.isBatch)
        result.push(action);
    });

    return result;
  }

  getTextColumnValue(column: NoxTableColumn, row: any) {
    const text: string = row[column.name];
    if (text != undefined) {
      if (column.ellipsisLength && text.length > column.ellipsisLength)
        return text.substring(0, column.ellipsisLength) + "...";
      else
        return text;
    } else {
      return "";
    }
  }

  getDateColumnValue(column: NoxTableColumn, row: any) {
    const rawValue = row[column.name];

    let dateFormat = this.configurationService.dateDisplayFormat;

    if (column.dateFormat)
      dateFormat = column.dateFormat;

    var date = this.dateTimeService.toLocalFromISO(rawValue);;
    
    return date.toFormat(dateFormat);
  }

  getTimeColumnValue(column: NoxTableColumn, row: any) {
    const rawValue = row[column.name];

    let timeFormat = this.configurationService.timeDisplayFormat;

    if (column.timeFormat)
      timeFormat = column.timeFormat;

    var time = this.dateTimeService.toLocalFromISO(rawValue);;

    return time.toFormat(timeFormat);
  }

  getDateTimeColumnValue(column: NoxTableColumn, row: any) {
    const rawValue = row[column.name];

    let dateTimeFormat = this.configurationService.dateTimeDisplayFormat;

    if (column.dateTimeFormat)
      dateTimeFormat = column.dateTimeFormat;

    var dateTime = this.dateTimeService.toLocalFromISO(rawValue);;

    return dateTime.toFormat(dateTimeFormat);
  }

  private getSelectedItems(): any[] {
    const result: any[] = [];

    if (this.selectionMode == "multiple") {
      for (let i = 0; i < this._rawData.length; i++) {
        const item = this._rawData[i];
        if (item[this.keyFieldName]) {
          let selected = false;
          for (let j = 0; j < this.selectedKeys.length; j++) {
            if (item[this.keyFieldName] == this.selectedKeys[j]) {
              result.push(item);
              break;
            }
          }
        }
      }
    } else if (this.selectionMode == "single") {
      if (this.selectedKeys && this.selectedKeys.length > 0) {
        for (let i = 0; i < this._data.length; i++) {
          const item = this._data[i];
          if (item[this.keyFieldName] == this.selectedKeys[0]) {
            result.push(item);
            break;
          }
        }
      }
    }

    return result;
  }

  private setSelectedItems() {
    if (this._selectedItems) {
      this.selectedKeys = [];

      for (let i = 0; i < this._selectedItems.length; i++) {
        const selectedItem = this._selectedItems[i];

        if (this._data) {
          for (let j = 0; j < this._data.length; j++) {
            const item = this._data[j];

            if (selectedItem[this.keyFieldName] == item[this.keyFieldName])
              this.selectedKeys.push(item[this.keyFieldName]);
          }
        }
      }
    }
  }

  public setDataForAdapter(rawData: any[] | null, processedData: any[] | null) {
    this._rawData = rawData;
    this._data = processedData;
  }

  public setSelectedItemsForAdapter(selectedItems: any[] | null) {
    this._selectedItems = selectedItems;
    this.selectedKeys = [];

    if (this._selectedItems) {
      for (let i = 0; i < this._selectedItems.length; i++) {
        const selectedItem = this._selectedItems[i];
        this.selectedKeys.push(selectedItem[this.keyFieldName]);
      }
    }
  }

  isItemSelected(row: any): boolean {
    return this.selectedKeys.indexOf(row[this.keyFieldName]) != -1;
  }

  getColumnTemplateContext(row: any, rowIndex: number, column: NoxTableColumn, columnIndex: number) {
    return {
      row: row,
      rowIndex: rowIndex,
      column: column,
      columnIndex: columnIndex,
      rows: this.data,
      columns: this.columns,
      value: row[column.name]
    };
  }

  getActionTemplateContext(row: any, rowIndex: number, action: NoxTableAction, actionIndex: number) {
    return {
      row: row,
      rowIndex: rowIndex,
      action: action,
      actionIndex: actionIndex,
      rows: this.data,
      columns: this.columns
    };
  }

  isActionEnabled(action: NoxTableAction, row: any) {
    return action.enabled && (row["actionEnabled"] == undefined || row["actionEnabled"][action.name] == undefined || row["actionEnabled"][action.name] == true);
  }

  isActionVisible(action: NoxTableAction, row: any) {
    return action.enabled && (row["actionVisible"] == undefined || row["actionVisible"][action.name] == undefined || row["actionVisible"][action.name] == true);
  }

  getWidthForColumn(column: NoxTableColumn): string | undefined {
    return column.width;
  }

  getTextAlignForColumn(column: NoxTableColumn): string {
    if (column.horizontalAlignment == "left")
      return "left";
    else if (column.horizontalAlignment == "center")
      return "center";
    else if (column.horizontalAlignment == "right")
      return "right";
    else
      return "left";
  }
}
