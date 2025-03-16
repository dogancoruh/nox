import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges } from '@angular/core';
import { NoxTreeNodeIconComponent } from './nox-tree-node-icon.component';
import { NoxTreeNodeIcon } from '../data/nox-tree-node-icon';

@Component({
  selector: 'nox-tree-node-icons',
  template: ""
})
export class NoxTreeNodeIconsComponent implements AfterContentInit, OnChanges {
  @ContentChildren(NoxTreeNodeIconComponent) itemIconComponents!: QueryList<NoxTreeNodeIconComponent>;

  @Input() defaultIcon: any;

  @Output() onChange = new EventEmitter();

  itemActions: NoxTreeNodeIcon[] = [];

  ngAfterContentInit(): void {
    if (this.itemIconComponents != null) {
      this.itemIconComponents.forEach((itemActionComponent: NoxTreeNodeIconComponent) => {
        itemActionComponent.onChange.subscribe((changes: SimpleChanges) => {
          this.itemIconComponents.forEach((itemActionComponent: NoxTreeNodeIconComponent) => {
            this.itemActions.forEach((item: NoxTreeNodeIcon) => {
              if (itemActionComponent.id == item.id) {
                item.type = itemActionComponent.type;
                item.icon = itemActionComponent.icon;
              }
            });
          });

          this.onChange.emit(changes);
        });

        this.itemActions.push({
          id: itemActionComponent.id,
          type: itemActionComponent.type,
          icon: itemActionComponent.icon
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChange.emit(changes);
  }
}
