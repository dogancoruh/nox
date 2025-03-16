import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { IdHelper } from "../../classes/id-helper";

@Component({
  selector: 'nox-page-action-button',
  template: ''
})
export class NoxPageActionButtonComponent implements OnChanges {
  id: string = IdHelper.createId();

  @Input() icon?: any = null;
  @Input() name: string = "";
  @Input() text: string = "";

  @Output() onChange = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
