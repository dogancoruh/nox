import { AfterViewInit, Component, ContentChild, ElementRef, Input, ViewChildren, QueryList, HostListener, EventEmitter, Output } from '@angular/core';
import { NoxFormField } from '../data/nox-form-field';
import { NoxFormButtonsComponent } from './nox-form-buttons.component';
import { ObjectHelper } from '../../nox-core/classes/object-helper';
import { NoxFormMode } from '../../nox-core/enums/nox-form-mode';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoxFormFieldValidator } from '../data/nox-form-field-validator';
import { NoxConfigurationService } from '../../nox-core/services/nox-configuration.service';
import { NoxFormFieldStaticDropDownItem } from '../data/nox-form-field-drop-static-down-item';
import { BootstrapHelper } from '../../nox-core/classes/bootstrap-helper';
import { NoxFormItem } from '../data/nox-form-item';
import { NoxFormFieldHelper } from '../utilities/nox-form-field-helper';
import { NoxFormFieldGroup } from '../data/nox-form-field-group';
import { NoxFormFieldValidatorType } from '../enums/nox-form-field-validator-type';
import { NoxFormItemIterator } from '../utilities/nox-form-item-iterator';
import { StringHelper } from '../../nox-core/classes/string-helper';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { NoxFormFieldActionEvent } from '../events/nox-form-field-action-event';
import { NoxFormFieldAction } from '../data/nox-form-field-action';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NoxDateTimePickerComponent } from '../../nox-controls/components/nox-date-time-picker/nox-date-time-picker.component';
import { NoxTreeDropDownComponent } from '../../nox-controls/components/nox-tree-drop-down/nox-tree-drop-down.component';
import { NoxTextTruncater } from '../../nox-core/pipes/nox-text-truncater.pipe';

@Component({
  selector: 'nox-form-field-repeater',
  templateUrl: './nox-form-field-repeater.component.html',
  styleUrls: ['./nox-form-field-repeater.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbTooltipModule,
    NoxDateTimePickerComponent,
    NoxTreeDropDownComponent,
    NoxTextTruncater
  ]
})
export class NoxFormFieldRepeaterComponent implements AfterViewInit {
  @ContentChild(NoxFormButtonsComponent) formButtonsComponent!: NoxFormButtonsComponent;

  @ViewChildren(NoxFormFieldRepeaterComponent) itemRepeaterComponents!: QueryList<NoxFormFieldRepeaterComponent>;

  iconInformation = faCircleInfo;

  @Input() repeaterId: string | undefined;

  @Input() formGroup!: FormGroup;
  @Input() buttonsEnabled: boolean = true;

  @Input() passwordRevealIcon: any;

  private _items!: NoxFormItem[] | undefined;

  get items(): NoxFormItem[] | undefined {
    return this._items;
  }
  @Input() set items(value: NoxFormItem[] | undefined) {
    this._items = value;

    this.invalidateItems(this._items);
  }

  @Input() fieldGroup: NoxFormFieldGroup | undefined;

  @Input() validationErrorRequiredText: string = "'{0}' field is required.";
  @Input() validationErrorMinLengthText: string = "You must enter at least {1} letters for '{0}' field.";
  @Input() validationErrorMaxLengthText: string = "You can enter maximum {1} letters for '{0}' field.";
  @Input() validationErrorEmailText: string = "Please enter a valid email address for '{0}' field.";
  @Input() validationErrorPatternText: string = "Please enter a valid format for '{0}' field.";
  @Input() validationErrorMatchText: string = "{0} and {1} are not matching."

  @Input() mode: NoxFormMode = "none";
  @Input() baseUrl: string | undefined = undefined;

  @Input() maxLabelLength: number = 32;

  @Input() readonly: boolean = false;

  @Output() onFieldAction = new EventEmitter<NoxFormFieldActionEvent>();

  getPropertyAsString = ObjectHelper.getPropertyAsString;
  getPropertyAsInt = ObjectHelper.getPropertyAsInt;
  getPropertyAsFloat = ObjectHelper.getPropertyAsFloat;
  getPropertyAsBoolean = ObjectHelper.getPropertyAsBoolean;
  getPropertyAsDateTime = ObjectHelper.getPropertyAsDateTime;

  getButtonAppearanceClassName = BootstrapHelper.getButtonAppearanceClassName;

  getFieldType = NoxFormFieldHelper.getFieldType;
  getFieldPlaceholder = NoxFormFieldHelper.getFieldPlaceholder;
  getFieldReadonly = NoxFormFieldHelper.getFieldReadonly;
  getFieldAutofocus = NoxFormFieldHelper.getFieldAutofocus;
  getFieldMaxLength = NoxFormFieldHelper.getFieldMaxLength;
  getFieldUserCanTogglePasswordVisibility = NoxFormFieldHelper.getFieldUserCanTogglePasswordVisibility;
  getFieldBaseUrl = NoxFormFieldHelper.getFieldBaseUrl;
  getFieldUrlPrefix = NoxFormFieldHelper.getFieldUrlPrefix;
  getFieldTextFieldName = NoxFormFieldHelper.getFieldTextFieldName;
  getFieldValueFieldName = NoxFormFieldHelper.getFieldValueFieldName;
  getFieldChildrenFieldName = NoxFormFieldHelper.getFieldChildrenFieldName;
  getFieldAcceptedFileExtensions = NoxFormFieldHelper.getFieldAcceptedFileExtensions;
  getFieldFilePropertyName = NoxFormFieldHelper.getFieldFilePropertyName;
  getFieldInformationText = NoxFormFieldHelper.getFieldInformationText;
  getFieldDropDownWidth = NoxFormFieldHelper.getFieldDropDownWidth;
  getFieldDropDownEmptySelectionText = NoxFormFieldHelper.getFieldDropDownEmptySelectionText;
  getFieldDateTimeViewMode = NoxFormFieldHelper.getFieldDateTimeViewMode;

  constructor(private elementRef: ElementRef,
    private configurationService: NoxConfigurationService) {
  }

  getData(result: any) {
    this._items?.forEach((item: NoxFormItem) => {
      if (item instanceof NoxFormField) {
        if (item.type == "file") {
          result[item.name] = this.formGroup.controls[item.name].value;

          const field = item as NoxFormField;
          let fileFieldName = field.filePropertyName;
          if (!fileFieldName)
            fileFieldName = field.name + "_file";

          result[fileFieldName] = this.formGroup.controls[fileFieldName].value;
        } else {
          result[item.name] = this.formGroup.controls[item.name].value;
        }
      } else if (item instanceof NoxFormFieldGroup) {
        this.itemRepeaterComponents.forEach((itemRepeatorComponent: NoxFormFieldRepeaterComponent) => {
          if (itemRepeatorComponent.repeaterId == item.id)
            itemRepeatorComponent.getData(result);
        });
      }
    });
  }

  setData(value: any) {
    this._items?.forEach((item: NoxFormItem) => {
      if (item instanceof NoxFormField) {
        this.formGroup.controls[item.name].setValue(value[item.name]);
        if (item.readonly)
          this.formGroup.controls[item.name].disable();
      } else if (item instanceof NoxFormFieldGroup) {
        this.itemRepeaterComponents.forEach((itemRepeatorComponent: NoxFormFieldRepeaterComponent) => {
          if (itemRepeatorComponent.repeaterId == item.id)
            itemRepeatorComponent.setData(value);
        });
      }
    });

    this.validateFieldsDependencies();
  }

  ngAfterViewInit(): void {
    // autofocus support
    if (this._items) {
      NoxFormItemIterator.itarateItems(this.items, (item: NoxFormItem, iterationArgs: any) => {
        if (item instanceof NoxFormField) {
          const field = item as NoxFormField;
          if (field.autofocus) {
            const elements = this.elementRef.nativeElement.getElementsByClassName("form-field");
            for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
              const element = elements[elementIndex];
              if (element.name == field.name)
                setTimeout(() => {
                  element.focus();
                });
            }
          }
        }
      });

      this.validateFieldsDependencies();
    }
  }

  invalidateItems(items: NoxFormItem[] | undefined) {
    // create controls for fields and add into formGroup
    if (items) {
      items.forEach((item: NoxFormItem) => {
        if (item instanceof NoxFormField) {
          const field = item as NoxFormField;

          let control: FormControl = new FormControl();

          control.valueChanges.subscribe((value: any) => {
            this.onFieldControlValueChanged(field, control, value);
          });

          // add validators
          if (field.validators) {
            field.validators.forEach((validator: NoxFormFieldValidator) => {
              if (validator.type == "min")
                control.addValidators(Validators.min(validator.value));
              else if (validator.type == "max")
                control.addValidators(Validators.max(validator.value));
              else if (validator.type == "required")
                control.addValidators(Validators.required);
              else if (validator.type == "minLength")
                control.addValidators(Validators.minLength(validator.value));
              else if (validator.type == "maxLength")
                control.addValidators(Validators.maxLength(validator.value));
              else if (validator.type == "pattern")
                control.addValidators(Validators.pattern(validator.pattern));
              else if (validator.type == "nullValidator")
                control.addValidators(Validators.nullValidator);
            });
          }

          control.disable();

          this.formGroup.addControl(field.name, control);

          if (field.type == "file") {
            let fileFieldName = field.filePropertyName;
            if (!fileFieldName)
              fileFieldName = field.name + "_file";

            this.formGroup.addControl(fileFieldName, new FormControl());
          }
        } else if (item instanceof NoxFormFieldGroup) {
          const fieldGroup = item as NoxFormFieldGroup;
          this.invalidateItems(fieldGroup.items);
        }
      });
    }
  }

  /********************************/
  /********************************/
  /********************************/

  getControlValue(name: string): any {
    return this.formGroup.controls[name].value;
  }

  getControlValueAsDateTime(name: string, format: string | undefined) {
    return this.formGroup.controls[name].value;
  }

  getFieldDropDownItems(item: NoxFormItem): Array<any> {
    let result: any[] = [];

    if (item instanceof NoxFormField) {
      const field = item as NoxFormField;

      field.staticDropDownItems?.forEach((item: NoxFormFieldStaticDropDownItem) => {
        if (item.mergeSide == "top") {
          const newItem: any = {};

          if (field.dropDownItemValueFieldName)
            newItem[field.dropDownItemValueFieldName] = item.value;
          if (field.dropDownItemDisplayFieldName)
            newItem[field.dropDownItemDisplayFieldName] = item.text;

          result.push(newItem);
        }
      });

      field.dropDownItems?.forEach((item: any) => {
        if (field.parentFieldName) {
          var parentField = this.getField(field.parentFieldName);
          if (parentField) {
            var parentFieldControl = this.formGroup.controls[parentField.name];
            if (parentFieldControl && field.dropDownItemForeignKeyFieldName) {
              if (item[field.dropDownItemForeignKeyFieldName]) {
                if (item[field.dropDownItemForeignKeyFieldName] == parentFieldControl.value)
                  result.push(item);
              } else {
                result.push(item);
              }
            } else {
              result.push(item);
            }
          } else {
            result.push(item);
          }
        } else {
          result.push(item);
        }
      });

      field.staticDropDownItems?.forEach((item: NoxFormFieldStaticDropDownItem) => {
        if (item.mergeSide == "bottom") {
          const newItem: any = {};

          if (field.dropDownItemValueFieldName)
            newItem[field.dropDownItemValueFieldName] = item.value;
          if (field.dropDownItemDisplayFieldName)
            newItem[field.dropDownItemDisplayFieldName] = item.text;

          result.push(newItem);
        }
      });
    }

    return result;
  }

  getFieldTreeDropDownItems(item: NoxFormItem): any[] | undefined {
    const result: any[] = [];

    if (item instanceof NoxFormField) {
      const field = item as NoxFormField;

      field.staticDropDownItems?.forEach((item: NoxFormFieldStaticDropDownItem) => {
        if (item.mergeSide == "top") {
          const newItem: any = {};

          if (field.dropDownItemValueFieldName)
            newItem[field.dropDownItemValueFieldName] = item.value;
          if (field.dropDownItemDisplayFieldName)
            newItem[field.dropDownItemDisplayFieldName] = item.text;

          result.push(newItem);
        }
      });

      field.dropDownItems?.forEach((item: any) => {
        if (field.parentFieldName) {
          var parentField = this.getField(field.parentFieldName);
          if (parentField) {
            var parentFieldControl = this.formGroup.controls[parentField.name];
            if (parentFieldControl && field.foreignKeyFieldName) {
              if (item[field.foreignKeyFieldName]) {
                if (item[field.foreignKeyFieldName] == parentFieldControl.value)
                  result.push(item);
              } else {
                result.push(item);
              }
            } else {
              result.push(item);
            }
          } else {
            result.push(item);
          }
        } else {
          result.push(item);
        }
      });

      field.staticDropDownItems?.forEach((item: NoxFormFieldStaticDropDownItem) => {
        if (item.mergeSide == "bottom") {
          const newItem: any = {};

          if (field.dropDownItemValueFieldName)
            newItem[field.dropDownItemValueFieldName] = item.value;
          if (field.dropDownItemDisplayFieldName)
            newItem[field.dropDownItemDisplayFieldName] = item.text;

          result.push(newItem);
        }
      });
    }

    return result;
  }

  /********************************/
  /********************************/
  /** Validation ******************/

  hasValidationError(fieldName: string, type: NoxFormFieldValidatorType): boolean {
    return this.formGroup.controls[fieldName].touched && this.formGroup.controls[fieldName].hasError(type.toLowerCase());
  }

  getValidationErrorMessage(item: NoxFormItem, type: NoxFormFieldValidatorType, defaultErrorMessage: string): any | null {
    const field = item as NoxFormField;

    if (field.validators) {
      for (let i = 0; i < field.validators.length; i++) {
        if (field.validators[i].type == type) {
          if (field.validators[i].errorMessage) {
            return this.formatString(field.validators[i].errorMessage, item.title, this.getValidationValue(item));
          } else {
            return this.formatString(defaultErrorMessage, item.title, this.getValidationValue(item));
          }
        }
      }
    }

    return "";
  }

  getValidationValue(item: NoxFormItem): any {
    if (!(item instanceof NoxFormField))
      return null;

    const field = item as NoxFormField;
    if (!this.formGroup.controls[field.name])
      return null;

    if (!this.formGroup.controls[field.name].errors)
      return null;

    if (this.formGroup.controls[field.name].errors?.['minlength'])
      return this.formGroup.controls[field.name].errors?.['minlength']['requiredLength'];
    else if (this.formGroup.controls[field.name].errors?.['match']) {
      return this.formGroup.controls[field.name].errors?.['match']['firstMatchFieldName'];
    }
  }

  /********************************/
  /********************************/
  /********************************/

  getFieldDropDownItemText(dropDownItem: any, item: NoxFormItem): any {
    if (item instanceof NoxFormField) {
      const field = item as NoxFormField;

      if (!field.dropDownItemDisplayFieldName)
        return null;

      if (dropDownItem[field.dropDownItemDisplayFieldName] == undefined)
        return null;

      return dropDownItem[field.dropDownItemDisplayFieldName];
    } else {
      return "";
    }
  }

  getDropDownItemValue(dropDownItem: any, item: NoxFormItem): any {
    if (item instanceof NoxFormField) {
      const field = item as NoxFormField;

      if (!field.dropDownItemValueFieldName)
        return null;

      if (dropDownItem[field.dropDownItemValueFieldName] == undefined)
        return null;

      return dropDownItem[field.dropDownItemValueFieldName];
    } else {
      return "";
    }
  }

  validateFieldsDependencies(fieldGroup: NoxFormFieldGroup | undefined = undefined) {
    NoxFormItemIterator.itarateItems(this.items, (item: NoxFormItem, iterationArgs: any) => {
      if (item instanceof NoxFormField) {
        const field = item as NoxFormField;
        const fieldControl = this.formGroup.controls[field.name];

        NoxFormItemIterator.itarateItems(this.items, (subItem: NoxFormItem, subIterationArgs: any) => {
          if (subItem instanceof NoxFormField) {
            const subField = subItem as NoxFormField;
            if (subField.parentFieldName && subField.parentFieldName == field.name) {
              const subFieldControl = this.formGroup.controls[subField.name];
              if (fieldControl && subFieldControl) {
                if (!this.readonly && fieldControl.value && !subField.readonly) {
                  subFieldControl.enable({
                    onlySelf: true,
                    emitEvent: false
                  });
                } else {
                  subFieldControl.disable({
                    onlySelf: true,
                    emitEvent: false
                  });
                }
              }
            }
          }
        });
      }
    });
  }

  clearChildDropDowns(parentField: NoxFormField, fieldGroup: NoxFormFieldGroup | undefined = undefined) {
    let items: NoxFormItem[] | undefined;

    if (fieldGroup)
      items = fieldGroup.items;
    else
      items = this.items;

    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i] instanceof NoxFormField) {
          const field = items[i] as NoxFormField;
          if (field) {
            if ((field.type == "dropDown" || field.type == "treeDropDown") &&
              field.parentFieldName &&
              field.parentFieldName == parentField.name) {
              const fieldControl = this.formGroup.controls[field.name];
              if (fieldControl) {
                fieldControl.setValue(undefined, {
                  emitEvent: false
                });
              }

              this.clearChildDropDowns(field);
            }
          }
        }

        if (items[i] instanceof NoxFormFieldGroup) {
          const fieldGroup = items[i] as NoxFormFieldGroup;
          if (fieldGroup)
            this.clearChildDropDowns(parentField, fieldGroup);
        }
      }
    }

    return undefined;
  }

  onFieldControlValueChanged(field: NoxFormField, control: AbstractControl, value: any) {
    if (field.type == "dropDown" || field.type == "treeDropDown") {
      this.clearChildDropDowns(field);
      this.validateFieldsDependencies();
    }
  }

  getItemType(item: NoxFormItem): "field" | "fieldGroup" | "none" {
    if (item instanceof NoxFormField)
      return "field";
    else if (item instanceof NoxFormFieldGroup)
      return "fieldGroup"
    else
      return "none";
  }

  getFieldGroupItems(item: NoxFormItem): NoxFormItem[] | undefined {
    if (item instanceof NoxFormFieldGroup) {
      return (item as NoxFormFieldGroup).items;
    } else {
      return undefined;
    }
  }

  formatString(str: string | undefined, ...val: string[]): string {
    if (str)
      return StringHelper.formatString(str, ...val);
    else
      return "";
  }

  /* item handling functions */

  getItemByName(name: string): NoxFormItem | undefined {
    let result: NoxFormItem | undefined = undefined;

    NoxFormItemIterator.itarateItems(this.items, (item: NoxFormItem, iterationArgs: any) => {
      if (item instanceof NoxFormField && item.name == name) {
        result = item;
        iterationArgs.cancel = true;
      }
    });

    return result;
  }

  getItemByParentFieldName(parentFieldName: string, fieldGroup: NoxFormFieldGroup | undefined = undefined): NoxFormItem | undefined {
    let result: NoxFormField | undefined = undefined;

    NoxFormItemIterator.itarateItems(this.items, (item: NoxFormItem, iterationArgs: any) => {
      if (item instanceof NoxFormField && item.parentFieldName == parentFieldName) {
        result = item;
        iterationArgs.cancel = true;
      }
    });

    return result;
  }

  getField(name: string): NoxFormField | undefined {
    var item = this.getItemByName(name);
    if (item)
      return item as NoxFormField;
    else
      return undefined;
  }

  getFieldGroup(name: string): NoxFormFieldGroup | undefined {
    var item = this.getItemByName(name);
    if (item)
      return item as NoxFormFieldGroup;
    else
      return undefined;
  }

  getItemAsFieldGroup(item: NoxFormItem): NoxFormFieldGroup {
    return item as NoxFormFieldGroup;
  }

  getItems(): NoxFormItem[] | undefined {
    if (!this.fieldGroup) {
      return this._items;
    } else {
      return this.fieldGroup.items;
    }
  }

  private passwordRevealPress: boolean = false;
  private passwordRevealField: NoxFormField | undefined;

  onPasswordRevealButtonMouseDown(event: MouseEvent, item: NoxFormItem) {
    event.preventDefault();
    event.stopPropagation();

    const field = item as NoxFormField;

    const elements = this.elementRef.nativeElement.getElementsByClassName("form-field");
    for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
      const element = elements[elementIndex];
      if (element.name == field.name) {
        element.setAttribute("type", "text");
      }
    }

    this.passwordRevealPress = true;
    this.passwordRevealField = field;

    return false;
  }

  onPasswordRevealButtonMouseUp(event: MouseEvent, item: NoxFormItem) {
    event.preventDefault();
    event.stopPropagation();

    this.passwordRevealPress = false;

    const field = item as NoxFormField;

    const elements = this.elementRef.nativeElement.getElementsByClassName("form-field");
    for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
      const element = elements[elementIndex];
      if (element.name == field.name) {
        element.setAttribute("type", "password");
      }
    }

    return false;
  }

  @HostListener('window:mouseup', ['$event'])
  onWindowMouseUp(event: MouseEvent) {
    if (this.passwordRevealPress) {
      const elements = this.elementRef.nativeElement.getElementsByClassName("form-field");
      for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
        const element = elements[elementIndex];
        if (this.passwordRevealField) {
          if (element.name == this.passwordRevealField.name) {
            element.setAttribute("type", "password");
          }
        }
      }

      this.passwordRevealPress = false;
      this.passwordRevealField = undefined;
    }
  }

  getDisplayItems() {
    const result: NoxFormItem[] = [];

    this._items?.forEach((item: NoxFormItem) => {
      let isHiddenField: boolean = false;

      if (item instanceof NoxFormField) {
        const field = item as NoxFormField;
        if (field.type == "hidden")
          isHiddenField = true;
      }

      if (!isHiddenField)
        result.push(item);
    });

    return result;
  }

  getHiddenItems() {
    const result: NoxFormItem[] = [];

    this._items?.forEach((item: NoxFormItem) => {
      let isHiddenField: boolean = false;

      if (item instanceof NoxFormField) {
        const field = item as NoxFormField;
        if (field.type == "hidden")
          isHiddenField = true;
      }

      if (isHiddenField)
        result.push(item);
    });

    return result;
  }

  onInputFileInput(event: any, item: NoxFormItem) {
    const file = event.target.files[0];

    const field = item as NoxFormField;

    let fileFieldName = field.filePropertyName;
    if (!fileFieldName)
      fileFieldName = field.name + "_file";

    this.formGroup.controls[field.name].setValue(file.name);
    this.formGroup.controls[field.name].markAsPristine();

    this.formGroup.controls[fileFieldName].setValue(file);
    this.formGroup.controls[fileFieldName].markAsPristine();
  }

  isFieldRequired(item: NoxFormItem) {
    const field = item as NoxFormField;

    let isRequired: boolean = false;

    if (field.validators) {
      for (let i = 0; i < field.validators?.length; i++) {
        const validator = field.validators[i];
        if (validator.type == "required") {
          isRequired = true;
          break;
        }
      }
    }

    return isRequired;
  }

  isFieldFileDisabled(item: NoxFormItem) {
    const field = item as NoxFormField;

    return this.readonly || field.readonly || (this.mode == "delete" || this.mode == "details");
  }

  getFieldValue(item: NoxFormItem) {
    return this.formGroup.controls[item.name].value;
  }

  hasFieldActions(item: NoxFormItem) {
    const field = item as NoxFormField;
    return field.actions?.length! > 0;
  }

  getFieldActions(item: NoxFormItem) {
    const field = item as NoxFormField;
    return field.actions;
  }

  onFieldActionButtonClicked(event: any, item: NoxFormItem, action: NoxFormFieldAction) {
    const field = item as NoxFormField;

    this.onFieldAction.emit({
      action: action,
      field: field
    })
  }

  onFormFieldRepeaterFieldAction(event: NoxFormFieldActionEvent) {
    this.onFieldAction.emit(event);
  }
}
