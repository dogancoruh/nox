import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { NoxTableColumnType } from '../enums/nox-table-column-type';
import { NoxTableDropDownColumnItemsComponent } from './nox-table-dropdown-column-items.component';
import { NoxTableColumnHorizontalAlignment } from '../enums/nox-table-column-horizontal-alignment';
import { IdHelper } from '../../nox-core/classes/id-helper';

@Component({
  selector: 'nox-table-column',
  template: "",
  standalone: true
})
export class NoxTableColumnComponent implements AfterContentInit, OnChanges {
  @ContentChild(NoxTableDropDownColumnItemsComponent) dropDownItemsComponent!: NoxTableDropDownColumnItemsComponent;
  @ContentChild(TemplateRef<any>) _template!: TemplateRef<any>;

  id: string = IdHelper.createId();

  @Input() name: string = "";
  @Input() type: NoxTableColumnType = "none";
  @Input() title: string = "";
  
  @Input() columnClass?: string | string[] | undefined = undefined;
  @Input() headerClass?: string | string[] | undefined = undefined;
  @Input() cellClass?: string | string[] | undefined = undefined;

  @Input() dropDownItems?: any;

  @Input() colorTrue?: string;
  @Input() colorFalse?: string;
  @Input() iconTrue?: any;
  @Input() iconFalse?: any;
  @Input() textTrue?: string;
  @Input() textFalse?: string;

  @Input() sortable?: boolean = false;
  @Input() selectable?: boolean = false;

  @Input() urlPrefix?: string = "";

  @Input() dateFormat?: string = "";
  @Input() timeFormat?: string = "";
  @Input() dateTimeFormat?: string = "";

  @Input() ellipsisLength?: number = 100;

  @Input() showValueDropDownNotMatching?: boolean = false;

  @Input() columnHeaderTitleColor?: string;

  @Input() get template(): TemplateRef<any> {
    return this._template;
  }

  @Input() horizontalAlignment: NoxTableColumnHorizontalAlignment = "left";

  @Input() width?: string = undefined;

  @Input() visible?: boolean = true;

  @Output() onChange = new EventEmitter();

  ngAfterContentInit(): void {
    if (this.dropDownItemsComponent) {
      this.dropDownItems = {};
      this.dropDownItemsComponent.items.forEach((item: any) => {
        this.dropDownItems[item.value] = item.text;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
