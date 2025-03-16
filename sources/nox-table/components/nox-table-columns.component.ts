import { AfterContentInit, Component, ContentChildren, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { NoxTableColumnComponent } from './nox-table-column.component';
import { NoxTableColumn } from '../data/nox-table-column';

@Component({
  selector: 'nox-table-columns',
  template: "",
  standalone: true
})
export class NoxTableColumnsComponent implements AfterContentInit {
  @ContentChildren(NoxTableColumnComponent) columnComponents!: NoxTableColumnComponent[];

  @Output() onChange = new EventEmitter();

  columns: NoxTableColumn[] = [];

  ngAfterContentInit(): void {
    if (this.columnComponents != null) {
      this.columnComponents.forEach((columnComponent: NoxTableColumnComponent) => {
        columnComponent.onChange.subscribe((changes: SimpleChanges) => {
          this.columnComponents.forEach((columnComponent: NoxTableColumnComponent) => {
            this.columns.forEach((column: NoxTableColumn) => {
              if (columnComponent.id == column.id) {
                column.name = columnComponent.name;
                column.type = columnComponent.type;
                column.title = columnComponent.title;
                column.columnClass = columnComponent.columnClass;
                column.headerClass = columnComponent.headerClass;
                column.cellClass = columnComponent.cellClass;
                column.dropDownItems = columnComponent.dropDownItems;
                column.colorTrue = columnComponent.colorTrue;
                column.colorFalse = columnComponent.colorFalse;
                column.iconTrue = columnComponent.iconTrue;
                column.iconFalse = columnComponent.iconFalse;
                column.textTrue = columnComponent.textTrue;
                column.textFalse = columnComponent.textFalse;
                column.sortable = columnComponent.sortable;
                column.selectable = columnComponent.selectable;
                column.imageLinkPrefix = columnComponent.urlPrefix;
                column.dateFormat = columnComponent.dateFormat;
                column.timeFormat = columnComponent.timeFormat;
                column.ellipsisLength = columnComponent.ellipsisLength;
                column.showValueDropDownNotMatching = columnComponent.showValueDropDownNotMatching;
                column.template = columnComponent.template;
                column.horizontalAlignment = columnComponent.horizontalAlignment;
                column.width = columnComponent.width;
                column.visible = columnComponent.visible;
              }
            });
          });

          this.onChange.emit(changes);
        });


        this.columns.push({
          id: columnComponent.id,
          name: columnComponent.name,
          type: columnComponent.type,
          title: columnComponent.title,
          columnClass: columnComponent.columnClass,
          headerClass: columnComponent.headerClass,
          cellClass: columnComponent.cellClass,
          dropDownItems: columnComponent.dropDownItems,
          colorTrue: columnComponent.colorTrue,
          colorFalse: columnComponent.colorFalse,
          iconTrue: columnComponent.iconTrue,
          iconFalse: columnComponent.iconFalse,
          textTrue: columnComponent.textTrue,
          textFalse: columnComponent.textFalse,
          sortable: columnComponent.sortable,
          selectable: columnComponent.selectable,
          imageLinkPrefix: columnComponent.urlPrefix,
          dateFormat: columnComponent.dateFormat,
          timeFormat: columnComponent.timeFormat,
          ellipsisLength: columnComponent.ellipsisLength,
          showValueDropDownNotMatching: columnComponent.showValueDropDownNotMatching,
          template: columnComponent.template,
          horizontalAlignment: columnComponent.horizontalAlignment,
          width: columnComponent.width,
          visible: columnComponent.visible
        });
      });
    }
  }
}
