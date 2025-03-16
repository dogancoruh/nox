import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { IdHelper } from "../../classes/id-helper";

@Component({
  selector: 'nox-breadcrumb-item',
  template: ''
})
export class NoxBreadcrumbItemComponent implements OnChanges {
  id: string = IdHelper.createId();

  @Input() title?: string = "";
  @Input() icon?: any = null;
  @Input() link?: [] | string;

  @Output() onChange = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
