import { NoxDateTimePickerViewMode } from "../../nox-controls/components/nox-date-time-picker/nox-date-time-picker-view-mode";
import { NoxFormField } from "../data/nox-form-field";
import { NoxFormItem } from "../data/nox-form-item";

export class NoxFormFieldHelper {
  static getFieldType(item: NoxFormItem): string {
    return (item as NoxFormField).type;
  }

  static getFieldPlaceholder(item: NoxFormItem): string | undefined {
    const value = (item as NoxFormField).placeholder;
    if (value)
      return value;
    else
      return "";
  }

  static getFieldReadonly(item: NoxFormItem): boolean | undefined {
    return (item as NoxFormField).readonly;
  }

  static getFieldAutofocus(item: NoxFormItem): boolean | undefined {
    return (item as NoxFormField).autofocus;
  }

  static getFieldMaxLength(item: NoxFormItem): number | undefined {
    return (item as NoxFormField).maxLength;
  }

  static getFieldUserCanTogglePasswordVisibility(item: NoxFormItem): boolean | undefined {
    return (item as NoxFormField).userCanTogglePasswordVisibility;
  }

  static getFieldBaseUrl(item: NoxFormItem, defaultValue: string | undefined): string | undefined {
    let baseUrl = (item as NoxFormField).baseUrl;
    if (!baseUrl)
      baseUrl = defaultValue;
    return baseUrl;
  }

  static getFieldUrlPrefix(item: NoxFormItem): string | undefined {
    return (item as NoxFormField).urlPrefix;
  }

  static getFieldTextFieldName(item: NoxFormItem): string | undefined {
    return (item as NoxFormField).textFieldName;
  }

  static getFieldValueFieldName(item: NoxFormItem): string | undefined {
    return (item as NoxFormField).valueFieldName;
  }

  static getFieldChildrenFieldName(item: NoxFormItem): string | undefined {
    return (item as NoxFormField).childrenFieldName;
  }

  static getFieldAcceptedFileExtensions(item: NoxFormItem): string | undefined {
    return (item as NoxFormField).acceptedFileExtentions;
  }

  static getFieldFilePropertyName(item: NoxFormItem): string | undefined {
    let filePropertyName = (item as NoxFormField).filePropertyName;

    if (!filePropertyName)
      filePropertyName = item.name + "_file";

    return filePropertyName;
  }

  static getFieldInformationText(item: NoxFormItem): string | undefined {
    return (item as NoxFormField).informationText;
  }

  static getFieldDropDownWidth(item: NoxFormItem): any {
    return (item as NoxFormField).dropDownWidth;
  }

  static getFieldDropDownEmptySelectionText(item: NoxFormItem): any {
    return (item as NoxFormField).dropDownEmptySelectionText;
  }

  static getFieldDateTimeViewMode(item: NoxFormItem): NoxDateTimePickerViewMode {
    switch ((item as NoxFormField).type) {
      case "date":
        return "date";
      case "time":
        return "time";
      default:
      case "dateTime":
        return "dateTime";
    }
  }
}
