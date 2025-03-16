import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IdHelper } from '../../nox-core/classes/id-helper';
import { NoxFormFieldValidatorType } from '../enums/nox-form-field-validator-type';

@Component({
  selector: 'nox-form-field-validator',
  template: ""
})
export class NoxFormFieldValidatorComponent implements OnChanges {
  id: string = IdHelper.createId();
  @Input() type: NoxFormFieldValidatorType = "none";
  @Input() value: number = 0;
  @Input() pattern: string | RegExp = "";
  @Input() errorMessage?: string = "";

  @Output() onChange = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
