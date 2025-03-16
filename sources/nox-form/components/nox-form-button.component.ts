import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NoxFormButtonType } from '../enums/nox-form-button-type';
import { IdHelper } from '../../nox-core/classes/id-helper';
import { NoxButtonAppearance } from '../../nox-core/enums/nox-button-appearance';

@Component({
  selector: 'nox-form-button',
  template: ""
})
export class NoxFormButtonComponent implements OnChanges {
  id: string = IdHelper.createId();

  @Input() name: string = "";
  @Input() type: NoxFormButtonType = "button";
  @Input() enabled?: boolean = true;
  @Input() visible?: boolean = true;
  @Input() appearance?: NoxButtonAppearance = "primary";
  @Input() title: string = "";
  @Input() link?: [] | string;
  @Input() validation?: boolean = false;

  @Output() onChange = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
