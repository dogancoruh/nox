import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IdHelper } from '../../nox-core/classes/id-helper';
import { NoxFormValidatorType } from '../enums/nox-form-validator-type';

@Component({
  selector: 'nox-form-validator',
  template: ""
})
export class NoxFormValidatorComponent implements OnChanges {
  id: string = IdHelper.createId();
  @Input() type: NoxFormValidatorType = "none";
  @Input() firstMatchFieldName?: string | undefined;
  @Input() secondMatchFieldName?: string | undefined;

  @Output() onChange = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
