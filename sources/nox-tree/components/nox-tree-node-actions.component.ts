import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, SimpleChanges } from '@angular/core';
import { NoxTreeNodeActionComponent } from './nox-tree-node-action.component';
import { NoxTreeNodeAction } from '../data/nox-tree-node-action';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nox-tree-node-actions',
  template: ""
})
export class NoxTreeNodeActionsComponent implements AfterContentInit {
  @ContentChildren(NoxTreeNodeActionComponent) itemActionComponents!: QueryList<NoxTreeNodeActionComponent>;

  @Output() onChange = new EventEmitter();

  itemActions: NoxTreeNodeAction[] = [];

  ngAfterContentInit(): void {
    if (this.itemActionComponents != null) {
      this.itemActionComponents.forEach((itemActionComponent: NoxTreeNodeActionComponent) => {
        itemActionComponent.onChange.subscribe((changes: SimpleChanges) => {
          this.itemActionComponents.forEach((itemActionComponent: NoxTreeNodeActionComponent) => {
            this.itemActions.forEach((item: NoxTreeNodeAction) => {
              if (itemActionComponent.id == item.id) {
                item.name = itemActionComponent.name;
                item.title = itemActionComponent.title;
                item.icon = itemActionComponent.icon;
                item.standartAction = itemActionComponent.standartAction;
                item.isContext = itemActionComponent.isContext;
                item.hasDivider = itemActionComponent.hasDivider;
                item.link = itemActionComponent.link;
                item.template = itemActionComponent.template;
                item.enabled = itemActionComponent.enabled;
              }
            });
          });

          this.onChange.emit(changes);
        });

        this.itemActions.push({
          id: itemActionComponent.id,
          name: itemActionComponent.name,
          title: itemActionComponent.title,
          icon: itemActionComponent.icon,
          standartAction: itemActionComponent.standartAction,
          isContext: itemActionComponent.isContext,
          hasDivider: itemActionComponent.hasDivider,
          link: itemActionComponent.link,
          template: itemActionComponent.template,
          enabled: itemActionComponent.enabled
        });
      });
    }
  }
}
