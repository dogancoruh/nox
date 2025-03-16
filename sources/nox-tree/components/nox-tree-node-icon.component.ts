import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IdHelper } from '../../nox-core/classes/id-helper';

@Component({
  selector: 'nox-tree-node-icon',
  template: ""
})
export class NoxTreeNodeIconComponent implements OnChanges {
  id: string = IdHelper.createId();
  @Input() type: string = "";
  @Input() icon?: any = null;

  @Output() onChange = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
