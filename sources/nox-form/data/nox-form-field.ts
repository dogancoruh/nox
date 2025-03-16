import { NoxFormFieldType } from "../enums/nox-form-field-type";
import { NoxFormFieldValueBehavior } from "../enums/nox-form-field-value-behavior";
import { NoxFormFieldValidator } from "./nox-form-field-validator";
import { EventEmitter } from '@angular/core';
import { NoxFormFieldStaticDropDownItem } from "./nox-form-field-drop-static-down-item";
import { NoxFormItem } from "./nox-form-item";
import { NoxFormFieldAction } from "./nox-form-field-action";

export class NoxFormField extends NoxFormItem {
  type: NoxFormFieldType = "none";
  dropDownItems?: any[];
  staticDropDownItems?: NoxFormFieldStaticDropDownItem[];
  dropDownItemDisplayFieldName?: string = "text";
  dropDownItemValueFieldName?: string = "value";
  dropDownItemForeignKeyFieldName?: string = "parentId";
  dropDownWidth: any = "300px";
  dropDownEmptySelectionText?: string = "";
  validators?: NoxFormFieldValidator[];
  readonly?: boolean = false;
  dateFormat?: string = "";
  autofocus?: boolean = false;
  baseUrl: string | undefined = undefined;
  urlPrefix?: string = "";
  valueBehavior: NoxFormFieldValueBehavior = "text";
  maxLength?: number = 255;
  filePropertyName?: string | undefined;
  parentFieldName?: string | undefined;
  userCanTogglePasswordVisibility?: boolean = false;
  textFieldName?: string = "text";
  valueFieldName?: string = "value";
  childrenFieldName?: string = "children";
  foreignKeyFieldName?: string = "parentId";
  acceptedFileExtentions?: string = "";
  disabled?: boolean = false;
  actions?: NoxFormFieldAction[];

  parentKeyValue?: any;

  onInvalidate?: any = new EventEmitter();

  public invalidate(): void {
    this.onInvalidate.emit();
  }
}
