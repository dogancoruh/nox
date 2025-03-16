import { AfterContentInit, Component, ContentChildren, Input, QueryList, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NoxSearchBarFieldComponent } from './nox-search-bar-field.component';
import { NoxSearchBarField } from '../data/nox-search-bar-field';

@Component({
  selector: 'nox-search-bar-fields',
  template: ''
})
export class NoxSearchBarFieldsComponent implements AfterContentInit {
  @ContentChildren(NoxSearchBarFieldComponent) fieldComponents!: QueryList<NoxSearchBarFieldComponent>;

  fields: NoxSearchBarField[] = [];

  @Output() onChange = new EventEmitter();

  ngAfterContentInit(): void {
    if (this.fieldComponents) {
      this.fieldComponents.forEach((fieldComponent: NoxSearchBarFieldComponent) => {
        fieldComponent.onChange.subscribe((changes: SimpleChanges) => {
          this.fieldComponents.forEach((fieldComponent: NoxSearchBarFieldComponent) => {
            this.fields.forEach((field: NoxSearchBarField) => {
              if (fieldComponent.id == field.id) {
                field.name = fieldComponent.name;
                field.title = fieldComponent.title;
                field.type = fieldComponent.type;
                field.defaultValue = fieldComponent.defaultValue;
                field.width = fieldComponent.width;
                field.dropDownWidth = fieldComponent.dropDownWidth;
                field.dropDownItems = fieldComponent.dropDownItems;
                field.dropDownStaticItems = fieldComponent.dropDownStaticItems;
                field.dropDownItemDisplayFieldName = fieldComponent.dropDownItemDisplayFieldName;
                field.dropDownItemValueFieldName = fieldComponent.dropDownItemValueFieldName;
                field.dropDownChildrenFieldName = fieldComponent.dropDownChildrenFieldName;
                field.treeDropdownEmptySelectionType = fieldComponent.treeDropdownEmptySelectionType;
                field.parentFieldName = fieldComponent.parentFieldName;
                field.dropDownItemForeignKeyFieldName = fieldComponent.dropDownItemForeignKeyFieldName;
                field.dropDownMultiSelect = fieldComponent.dropDownMultiSelect;
                field.icon = fieldComponent.icon;
                field.visible = fieldComponent.visible;
                field.itemclass = fieldComponent.itemClass;
                field.placeholder = fieldComponent.placeholder;
              }
            });
          });
        });

        this.fields.push({
          id: fieldComponent.id,
          name: fieldComponent.name,
          title: fieldComponent.title,
          type: fieldComponent.type,
          defaultValue: fieldComponent.defaultValue,
          width: fieldComponent.width,
          dropDownWidth: fieldComponent.dropDownWidth,
          dropDownItems: fieldComponent.dropDownItems,
          dropDownStaticItems: fieldComponent.dropDownStaticItems,
          dropDownItemDisplayFieldName: fieldComponent.dropDownItemDisplayFieldName,
          dropDownItemValueFieldName: fieldComponent.dropDownItemValueFieldName,
          dropDownChildrenFieldName: fieldComponent.dropDownChildrenFieldName,
          treeDropdownEmptySelectionType: fieldComponent.treeDropdownEmptySelectionType,
          parentFieldName: fieldComponent.parentFieldName,
          dropDownItemForeignKeyFieldName: fieldComponent.dropDownItemForeignKeyFieldName,
          dropDownMultiSelect: fieldComponent.dropDownMultiSelect,
          icon: fieldComponent.icon,
          visible: fieldComponent.visible,
          itemclass: fieldComponent.itemClass,
          placeholder: fieldComponent.placeholder
        });
      });
    }
  }
}
