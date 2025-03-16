import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NoxFormField } from '../data/nox-form-field';
import { NoxFormItemsComponent } from './nox-form-items.component';
import { NoxFormButtonsComponent } from './nox-form-buttons.component';
import { NoxFormButton } from '../data/nox-form-button';
import { ObjectHelper } from '../../nox-core/classes/object-helper';
import { NoxFormMode } from '../../nox-core/enums/nox-form-mode';
import { NoxConfigurationService } from '../../nox-core/services/nox-configuration.service';
import { BootstrapHelper } from '../../nox-core/classes/bootstrap-helper';
import { NoxFormItem } from '../data/nox-form-item';
import { NoxFormFieldHelper } from '../utilities/nox-form-field-helper';
import { NoxFormFieldRepeaterComponent } from './nox-form-field-repeater.component';
import { NoxFormItemIterator } from '../utilities/nox-form-item-iterator';
import { NoxFormValidatorsComponent } from './nox-form-validators.component';
import { NoxFormValidator } from '../data/nox-form-validator';
import { NoxFormMessageLocation } from '../enums/nox-form-message-location';
import { NoxFormButtonsAlign } from '../enums/nox-form-buttons-align';
import { NoxFormDeleteDisclaimerLocation } from '../enums/nox-form-delete-disclaimer-location';
import { NoxFormButtonEvent } from '../events/nox-form-button-event';
import { NoxFormSubmitEvent } from '../events/nox-form-submit-event';
import { NoxFormFieldActionEvent } from '../events/nox-form-field-action-event';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { NoxFormButtonComponent } from './nox-form-button.component';

@Component({
  selector: 'nox-form',
  templateUrl: './nox-form.component.html',
  styleUrls: ['./nox-form.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoxFormFieldRepeaterComponent
  ]
})
export class NoxFormComponent implements AfterContentInit, AfterViewInit {
  @ContentChild(NoxFormItemsComponent) itemsComponent!: NoxFormItemsComponent;
  @ContentChild(NoxFormValidatorsComponent) validatorsComponent!: NoxFormValidatorsComponent;
  @ContentChild(NoxFormButtonsComponent) buttonsComponent!: NoxFormButtonsComponent;

  @ViewChild(NoxFormFieldRepeaterComponent) fieldContainerComponent!: NoxFormFieldRepeaterComponent;

  items: NoxFormItem[] = [];
  validators: NoxFormValidator[] = [];
  buttons: NoxFormButton[] = [];

  formGroup: FormGroup = new FormGroup({});

  faCircleMarks = faCircleXmark;

  buttonsEnabled: boolean = true;

  get data(): any {
    const result: any = {};

    this.fieldContainerComponent.getData(result);

    return result;
  }
  @Input() set data(value: any) {
    if (!value)
      throw new Error("NoxForm > data is null or undefined");

    this.fieldContainerComponent.setData(value);

    this.formGroup.setErrors(null);
    this.formGroup.markAsUntouched();
    this.formGroup.markAsPristine();
  }

  /** Shows spinner on submit button */
  @Input() buttonSpinnerVisible: boolean = false;

  /** Error text for 'required' validation. */
  @Input() validationErrorRequiredText: string = "'{0}' field is required.";
  @Input() validationErrorMinLengthText: string = "You must enter at least {1} letters for '{0}' field.";
  @Input() validationErrorMaxLengthText: string = "You can enter maximum {1} letters for '{0}' field.";
  @Input() validationErrorEmailText: string = "Please enter a valid email address for '{0}' field.";
  @Input() validationErrorPatternText: string = "Please enter a valid format for '{0}' field.";
  @Input() validationErrorMatchText: string = "'{0}' and '{1}' fields are not matching."

  @Input()
  get dirty(): boolean {
    return this.formGroup.dirty;
  }

  private _mode: NoxFormMode = "none";
  @Input()
  get mode(): NoxFormMode {
    return this._mode;
  }
  set mode(value: NoxFormMode) {
    this._mode = value;

    this.updateFormGroupState();
  }

  @Input() baseUrl: string = "";

  @Input() passwordRevealIcon: any;

  @Input() successMassageLocation: NoxFormMessageLocation = "bottom";
  @Input() successMessage: string = "";

  @Input() errorMessageLocation: NoxFormMessageLocation = "bottom";
  @Input() errorMessage: string = "";

  @Input() deleteDisclaimer: string = "";
  @Input() deleteDisclaimerLocation: NoxFormDeleteDisclaimerLocation = "top";

  private _readonly: boolean = false;

  get readonly(): boolean {
    return this._readonly;
  }
  @Input() set readonly(value: boolean) {
    this._readonly = value;

    this.updateFormGroupState();
  }

  get valid(): boolean {
    return this.formGroup.valid;
  }

  @Input() maxLabelLength: number = 25;

  @Input() buttonsAlign: NoxFormButtonsAlign = "right";

  @Output() onSubmit = new EventEmitter<NoxFormSubmitEvent>();
  @Output() onButton = new EventEmitter<NoxFormButtonEvent>();

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
  getFieldMaxLabelLength = NoxFormFieldHelper.getFieldMaxLength;

  constructor(private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private configurationService: NoxConfigurationService) {
    this.validationErrorRequiredText = configurationService.formValidationErrorRequiredText;
    this.validationErrorMinLengthText = configurationService.formValidationErrorMinLengthText;
    this.validationErrorMaxLengthText = configurationService.formValidationErrorMaxLengthText;
    this.validationErrorEmailText = configurationService.formValidationErrorEmailText;
    this.validationErrorPatternText = configurationService.formValidationErrorPatternText;

    this.passwordRevealIcon = configurationService.passwordRevealIcon;
    
    this.baseUrl = this.configurationService.baseUrl;
  }

  ngAfterContentInit(): void {
    // fields
    if (this.itemsComponent) {
      // support for binding
      this.itemsComponent.onChange.subscribe((changes: SimpleChanges) => {
        this.items = this.itemsComponent.items;
      });
      this.items = this.itemsComponent.items;
    }

    // validators
    if (this.validatorsComponent) {
      this.validatorsComponent.onChange.subscribe((changes: SimpleChanges) => {
        this.validators = this.validatorsComponent.validators;
      });
      this.validators = this.validatorsComponent.validators;

      this.formGroup.clearValidators();
      this.validators.forEach((validator: NoxFormValidator) => {
        if (validator.type == "match") {
          this.formGroup.addValidators(matchValidator(validator.firstMatchFieldName, validator.secondMatchFieldName));
        }
      });
    }

    // buttons
    if (this.buttonsComponent) {
      // binding support
      this.buttonsComponent.onChange.subscribe((changes: SimpleChanges) => {
        this.buttons = this.buttonsComponent.buttons;
      });
      this.buttons = this.buttonsComponent.buttons;
    }
  }

  ngAfterViewInit(): void {
    this.updateFormGroupState();

    this.changeDetectorRef.detectChanges();
  }

  /********************************/
  /********************************/

  onButtonClicked(event: any, button: NoxFormButton) {
    if (button.type == "submit") {
      this.onSubmit.emit({
        button: button,
        data: this.data,
        dirty: this.dirty
      });
    } else {
      this.onButton.emit({
        button: button,
        data: this.data,
        dirty: this.dirty
      });
    }
  }

  /****************************************/
  /****************************************/
  /****************************************/

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

  getField(name: string): NoxFormField | undefined {
    var item = this.getItemByName(name);
    if (item)
      return item as NoxFormField;
    else
      throw new Error(`NoxForm > getField > field not found '${name}'.`);
  }

  updateFormGroupState() {
    if (this._readonly || this._mode == "details")
      this.formGroup.disable();
    else
      this.formGroup.enable();
  }

  getSubmitButtonDisabled(button: NoxFormButton) {
    if (!this.buttonsEnabled)
      return true;

    if (!button.enabled)
      return true;

    if ((button.type == 'submit' || button.validation) && !this.formGroup.valid && this.mode != "delete")
      return true;

    return false;
  }

  onFormFieldRepeaterFieldAction(event: NoxFormFieldActionEvent) {
    this.onFieldAction.emit(event)
  }

  clearFieldValue(name: string) {
    this.formGroup.controls[name].setValue(null);
  }

  setFieldValue(name: string, value: any) {
    this.formGroup.controls[name].setValue(value);
  }
}

export const matchValidator = (firstControlName: string | undefined, secondControlName: string | undefined): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (firstControlName && secondControlName) {
      const firstControl = control.get(firstControlName);
      const secondControl = control.get(secondControlName);
      if (firstControl && secondControl) {
        if (secondControl.value && secondControl.value !== firstControl.value) {
          secondControl.setErrors({
            match: {
              firstMatchFieldName: firstControlName,
              secondMatchFieldName: secondControlName
            }
          });
        }
      }
    }

    return null;
  };
};
