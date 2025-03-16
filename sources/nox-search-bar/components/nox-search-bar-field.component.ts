import { AfterContentInit, Component, ContentChild, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NoxSearchBarFieldType } from '../enums/nox-search-bar-field-type';
import { NoxSearchBarFieldDropDownItemsComponent } from './nox-search-bar-field-drop-down-items.component';
import { IdHelper } from '../../nox-core/classes/id-helper';
import { NoxSearchBarFieldDropDownStaticItemsComponent } from './nox-search-bar-field-drop-down-static-items.component';
import { NoxSearchBarFieldDropDownStaticItem } from '../data/nox-search-bar-field-drop-down-static-item';
import { NoxTreeDropDownEmptySelectionType } from '../../nox-controls/components/nox-tree-drop-down/enums/nox-tree-drop-down-empty-selection-type';

@Component({
  selector: 'nox-search-bar-field',
  template: ''
})
export class NoxSearchBarFieldComponent implements AfterContentInit, OnChanges {
  @ContentChild(NoxSearchBarFieldDropDownItemsComponent) dropDownItemsComponent!: NoxSearchBarFieldDropDownItemsComponent;
  @ContentChild(NoxSearchBarFieldDropDownStaticItemsComponent) dropDownStaticItemsComponent!: NoxSearchBarFieldDropDownStaticItemsComponent;

  id: string = IdHelper.createId();

  @Input() name: string = "";
  @Input() title: string = "";
  @Input() type: NoxSearchBarFieldType = "text";
  @Input() defaultValue?: any = null;
  @Input() width: any = "100px";
  @Input() dropDownWidth: any = "300px";
  @Input() dropDownItems?: any[] = [];
  @Input() dropDownStaticItems?: NoxSearchBarFieldDropDownStaticItem[] = [];
  @Input() dropDownItemDisplayFieldName?: string = "text";
  @Input() dropDownItemValueFieldName?: string = "value";
  @Input() dropDownChildrenFieldName?: string = "items";
  @Input() treeDropdownEmptySelectionType?: NoxTreeDropDownEmptySelectionType = "none";
  @Input() parentFieldName?: string = "";
  @Input() dropDownItemForeignKeyFieldName?: string = "";
  @Input() dropDownMultiSelect?: boolean = false;
  @Input() icon?: any;
  @Input() visible?: boolean = true;
  @Input() itemClass?: string = "";

  @Input() placeholder?: string = "";

  @Output() onChange = new EventEmitter();

  ngAfterContentInit(): void {
    if (this.dropDownItemsComponent) {
      this.dropDownItems = [];
      this.dropDownItemsComponent.dropDownItems.forEach((dropDownItem: any) => {
        this.dropDownItems?.push({
          text: dropDownItem.text,
          value: dropDownItem.value
        })
      });
    }

    if (this.dropDownStaticItemsComponent) {
      this.dropDownStaticItems = [];
      this.dropDownStaticItemsComponent.dropDownStaticItems.forEach((dropDownStaticItem: any) => {
        this.dropDownStaticItems?.push({
          text: dropDownStaticItem.text,
          value: dropDownStaticItem.value,
          mergeSide: dropDownStaticItem.mergeSide
        })
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
