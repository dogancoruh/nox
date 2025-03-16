import { Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { IdHelper } from '../../nox-core/classes/id-helper';
import { NoxTreeNodeStandartActionType } from '../enums/nox-tree-node-standart-action-type';

@Component({
  selector: 'nox-tree-node-action',
  template: ""
})
export class NoxTreeNodeActionComponent implements OnChanges {
  @ContentChild(TemplateRef<any>) _template!: TemplateRef<any>;

  id: string = IdHelper.createId();
  @Input() name: string = "";
  @Input() title?: string = "";
  @Input() icon?: any = null;
  @Input() nodeType?: string = "";
  @Input() standartAction?: NoxTreeNodeStandartActionType = "none";
  @Input() isContext?: boolean = true;
  @Input() hasDivider?: boolean = false;
  @Input() link?: string = "";

  @Input() get template(): TemplateRef<any> {
    return this._template;
  }

  @Input() enabled?: boolean = true;

  @Output() onChange = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
