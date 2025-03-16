import { AfterContentInit, Component, ContentChildren, EventEmitter, Output, QueryList, SimpleChanges } from '@angular/core';
import { NoxFormValidatorComponent } from './nox-form-validator.component';
import { NoxFormValidator } from '../data/nox-form-validator';

@Component({
  selector: 'nox-form-validators',
  template: ""
})
export class NoxFormValidatorsComponent implements AfterContentInit {
  @ContentChildren(NoxFormValidatorComponent) validatorComponents!: QueryList<NoxFormValidatorComponent>;

  @Output() onChange = new EventEmitter();

  validators: NoxFormValidator[] = [];

  ngAfterContentInit(): void {
    if (this.validatorComponents != null) {
      this.validatorComponents.forEach((validatorComponent: NoxFormValidatorComponent) => {
        validatorComponent.onChange.subscribe((changes: SimpleChanges) => {
          this.validatorComponents.forEach((validatorComponent: NoxFormValidatorComponent) => {
            this.validators.forEach((item: NoxFormValidator) => {
              if (validatorComponent.id == item.id) {
                item.type = validatorComponent.type;
                item.firstMatchFieldName = validatorComponent.firstMatchFieldName;
                item.secondMatchFieldName = validatorComponent.secondMatchFieldName;
              }
            });
          });

          this.onChange.emit(changes);
        });

        this.validators.push({
          id: validatorComponent.id,
          type: validatorComponent.type,
          firstMatchFieldName: validatorComponent.firstMatchFieldName,
          secondMatchFieldName: validatorComponent.secondMatchFieldName
        });
      });
    }
  }
}
