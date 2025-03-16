import { Component, Output, EventEmitter, OnChanges, SimpleChanges, ContentChild, QueryList, Input, AfterContentInit, ContentChildren } from '@angular/core';
import { NoxFormItemComponent } from './nox-form-item.component';
import { NoxFormFieldComponent } from './nox-form-field.component';
import { NoxFormItem } from '../data/nox-form-item';
import { NoxFormField } from '../data/nox-form-field';
import { NoxFormFieldGroup } from '../data/nox-form-field-group';
import { NoxFormFieldValidator } from '../data/nox-form-field-validator';
import { NoxFormFieldStaticDropDownItem } from '../data/nox-form-field-drop-static-down-item';
import { NoxFormFieldAction } from '../data/nox-form-field-action';

@Component({
  selector: 'nox-form-field-group',
  template: "",
  providers: [{ provide: NoxFormItemComponent, useExisting: NoxFormFieldGroupComponent }]
})
export class NoxFormFieldGroupComponent extends NoxFormItemComponent implements AfterContentInit, OnChanges {
  @ContentChildren(NoxFormItemComponent) itemComponents!: QueryList<NoxFormItemComponent>;

  @Output() onChange = new EventEmitter();

  items: NoxFormItem[] = [];

  ngAfterContentInit(): void {
    if (this.itemComponents != null) {
      this.itemComponents.forEach((itemComponent: NoxFormItemComponent) => {
        // field
        if (itemComponent instanceof NoxFormFieldComponent) {
          const fieldComponent = itemComponent as NoxFormFieldComponent;

          fieldComponent.onChange.subscribe((changes: SimpleChanges) => {
            this.itemComponents.forEach((itemComponent: NoxFormItemComponent) => {
              this.items.forEach((item: NoxFormItem) => {
                if (itemComponent.id == item.id) {
                  if (item instanceof NoxFormField) {
                    const field = item as NoxFormField;

                    field.name = fieldComponent.name;
                    field.type = fieldComponent.type;
                    field.title = fieldComponent.title;
                    field.visible = fieldComponent.visible;
                    field.readonly = fieldComponent.readonly;
                    field.dateFormat = fieldComponent.dateFormat;
                    field.autofocus = fieldComponent.autofocus;
                    field.baseUrl = fieldComponent.baseUrl;
                    field.urlPrefix = fieldComponent.urlPrefix;
                    field.valueBehavior = fieldComponent.valueBehavior;
                    field.maxLength = fieldComponent.maxLength;
                    field.sizeClass = fieldComponent.sizeClass;
                    field.customClass = fieldComponent.customClass;
                    field.filePropertyName = fieldComponent.filePropertyName;
                    field.placeholder = fieldComponent.placeholder;
                    field.parentFieldName = fieldComponent.parentFieldName;
                    field.userCanTogglePasswordVisibility = fieldComponent.userCanTogglePasswordVisibility;
                    field.textFieldName = fieldComponent.textFieldName;
                    field.valueFieldName = fieldComponent.valueFieldName;
                    field.childrenFieldName = fieldComponent.childrenFieldName;
                    field.foreignKeyFieldName = fieldComponent.foreignKeyFieldName;
                    field.acceptedFileExtentions = fieldComponent.acceptedFileExtensions;
                    field.disabled = fieldComponent.disabled;
                    field.informationText = fieldComponent.informationText;
                    field.placeholder = fieldComponent.placeholder;

                    field.dropDownItemDisplayFieldName = fieldComponent.dropDownItemDisplayFieldName;
                    field.dropDownItemValueFieldName = fieldComponent.dropDownItemValueFieldName;
                    field.dropDownItemForeignKeyFieldName = fieldComponent.dropDownItemForeignKeyFieldName;
                    field.dropDownWidth = fieldComponent.dropDownWidth;
                    field.dropDownEmptySelectionText = fieldComponent.dropDownEmptySelectionText;

                    this.setFieldDropDownItems(field, fieldComponent.dropDownItems);
                    this.setFieldStaticDropDownItems(field, fieldComponent.staticDropDownItems);
                    this.setFieldValidators(field, fieldComponent.validators);
                    this.setFieldActions(field, fieldComponent.actions);
                  }
                }
              });
            });

            this.onChange.emit(changes);
          });

          const field = new NoxFormField();

          field.id = fieldComponent.id;
          field.name = fieldComponent.name;
          field.type = fieldComponent.type;
          field.title = fieldComponent.title;
          field.visible = fieldComponent.visible;
          field.readonly = fieldComponent.readonly;
          field.dateFormat = fieldComponent.dateFormat;
          field.autofocus = fieldComponent.autofocus;
          field.baseUrl = fieldComponent.baseUrl;
          field.urlPrefix = fieldComponent.urlPrefix;
          field.valueBehavior = fieldComponent.valueBehavior;
          field.maxLength = fieldComponent.maxLength;
          field.sizeClass = fieldComponent.sizeClass;
          field.customClass = fieldComponent.customClass;
          field.filePropertyName = fieldComponent.filePropertyName;
          field.placeholder = fieldComponent.placeholder;
          field.parentFieldName = fieldComponent.parentFieldName;
          field.userCanTogglePasswordVisibility = fieldComponent.userCanTogglePasswordVisibility;
          field.textFieldName = fieldComponent.textFieldName;
          field.valueFieldName = fieldComponent.valueFieldName;
          field.childrenFieldName = fieldComponent.childrenFieldName;
          field.foreignKeyFieldName = fieldComponent.foreignKeyFieldName;
          field.acceptedFileExtentions = fieldComponent.acceptedFileExtensions;
          field.disabled = fieldComponent.disabled;
          field.informationText = fieldComponent.informationText;
          field.placeholder = fieldComponent.placeholder;

          field.dropDownItemDisplayFieldName = fieldComponent.dropDownItemDisplayFieldName;
          field.dropDownItemValueFieldName = fieldComponent.dropDownItemValueFieldName;
          field.dropDownItemForeignKeyFieldName = fieldComponent.dropDownItemForeignKeyFieldName;
          field.dropDownWidth = fieldComponent.dropDownWidth;
          field.dropDownEmptySelectionText = fieldComponent.dropDownEmptySelectionText;

          this.setFieldDropDownItems(field, fieldComponent.dropDownItems);
          this.setFieldStaticDropDownItems(field, fieldComponent.staticDropDownItems);
          this.setFieldValidators(field, fieldComponent.validators);
          this.setFieldActions(field, fieldComponent.actions);

          this.items.push(field);
        } else if (itemComponent instanceof NoxFormFieldGroupComponent) {
          const fieldGroupComponent = itemComponent as NoxFormFieldGroupComponent;

          // change event
          fieldGroupComponent.onChange.subscribe((changes: SimpleChanges) => {
            this.itemComponents.forEach((itemComponent: NoxFormItemComponent) => {
              this.items.forEach((item: NoxFormItem) => {
                if (itemComponent.id == item.id) {
                  if (item instanceof NoxFormFieldGroup) {
                    const fieldGroup = item as NoxFormFieldGroup;

                    fieldGroup.name = fieldGroupComponent.name;
                    fieldGroup.title = fieldGroupComponent.title;
                    fieldGroup.visible = fieldGroupComponent.visible;
                    fieldGroup.customClass = fieldGroupComponent.customClass;
                    fieldGroup.informationText = fieldGroupComponent.informationText;
                  }
                }
              });
            });
          });

          // field group
          const fieldGroup = new NoxFormFieldGroup();

          fieldGroup.id = fieldGroupComponent.id;
          fieldGroup.name = fieldGroupComponent.name;
          fieldGroup.title = fieldGroupComponent.title;
          fieldGroup.visible = fieldGroupComponent.visible;
          fieldGroup.customClass = fieldGroupComponent.customClass;
          fieldGroup.informationText = fieldGroupComponent.informationText;

          fieldGroup.items = fieldGroupComponent.items;

          this.items.push(fieldGroup);
        }
      });
    }
  }

  setFieldDropDownItems(field: NoxFormField, dropDownItems: any[] | undefined) {
    field.dropDownItems = [];
    if (dropDownItems) {
      dropDownItems.forEach((dropDownItem: any) => {
        field.dropDownItems?.push({
          text: dropDownItem.text,
          value: dropDownItem.value
        });
      });
    }
  }

  setFieldStaticDropDownItems(field: NoxFormField, staticDropDownItems: any[] | undefined) {
    field.staticDropDownItems = [];
    if (staticDropDownItems) {
      staticDropDownItems?.forEach((staticDropDownItem: NoxFormFieldStaticDropDownItem) => {
        field.staticDropDownItems?.push({
          text: staticDropDownItem.text,
          value: staticDropDownItem.value,
          hasNullValue: staticDropDownItem.hasNullValue,
          mergeSide: staticDropDownItem.mergeSide
        });
      });
    }
  }

  setFieldValidators(field: NoxFormField, validators: NoxFormFieldValidator[] | undefined) {
    field.validators = [];
    if (validators) {
      validators?.forEach((validator: NoxFormFieldValidator) => {
        field.validators?.push({
          id: validator.id,
          type: validator.type,
          value: validator.value,
          pattern: validator.pattern,
          errorMessage: validator.errorMessage
        });
      });
    }
  }

  setFieldActions(field: NoxFormField, actions: NoxFormFieldAction[] | undefined) {
    field.actions = [];
    if (actions) {
      actions?.forEach((action: NoxFormFieldAction) => {
        field.actions?.push({
          name: action.name,
          icon: action.icon,
          text: action.text
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
