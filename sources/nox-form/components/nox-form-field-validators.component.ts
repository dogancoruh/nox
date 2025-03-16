import { AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList, SimpleChanges } from '@angular/core';
import { NoxFormFieldValidator } from '../data/nox-form-field-validator';
import { NoxFormFieldValidatorComponent } from './nox-form-field-validator.component';

@Component({
  selector: 'nox-form-field-validators',
  template: ""
})
export class NoxFormFieldValidatorsComponent implements AfterContentInit {
  @ContentChildren(NoxFormFieldValidatorComponent) validatorComponents!: QueryList<NoxFormFieldValidatorComponent>;

  @Output() onChange = new EventEmitter();

  validators: NoxFormFieldValidator[] = [];

  ngAfterContentInit(): void {
    if (this.validatorComponents != null) {
      this.validatorComponents.forEach((validatorComponent: NoxFormFieldValidatorComponent) => {
        validatorComponent.onChange.subscribe((changes: SimpleChanges) => {
          this.validatorComponents.forEach((validatorComponent: NoxFormFieldValidatorComponent) => {
            this.validators.forEach((item: NoxFormFieldValidator) => {
              if (validatorComponent.id == item.id) {
                item.type = validatorComponent.type;
                item.value = validatorComponent.value;
                item.pattern = validatorComponent.pattern;
                item.errorMessage = validatorComponent.errorMessage;
              }
            });
          });

          this.onChange.emit(changes);
        });

        this.validators.push({
          id: validatorComponent.id,
          type: validatorComponent.type,
          value: validatorComponent.value,
          pattern: validatorComponent.pattern,
          errorMessage: validatorComponent.errorMessage
        });
      });
    }
  }
}
