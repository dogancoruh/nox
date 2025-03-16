import { AfterContentInit, Component, ContentChildren } from '@angular/core';
import { NoxTableActionComponent } from './nox-table-action.component';
import { NoxTableAction } from '../data/nox-table-action';

@Component({
  selector: 'nox-table-actions',
  template: ""
})
export class NoxTableActionsComponent implements AfterContentInit {
  @ContentChildren(NoxTableActionComponent) actionComponents!: NoxTableActionComponent[];

  actions: NoxTableAction[] = [];

  ngAfterContentInit(): void {
    if (this.actionComponents != null) {
      this.actionComponents.forEach((actionComponent: NoxTableActionComponent) => {
        this.actions.push({
          name: actionComponent.name,
          title: actionComponent.title,
          link: actionComponent.link,
          buttonType: actionComponent.buttonType,
          isContext: actionComponent.isContext,
          isBatch: actionComponent.isBatch,
          hasDivider: actionComponent.hasDivider,
          template: actionComponent.template,
          enabled: actionComponent.enabled
        } as NoxTableAction);
      });
    }
  }
}
