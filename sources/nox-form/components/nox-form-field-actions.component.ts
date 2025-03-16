import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { NoxFormFieldActionComponent } from './nox-form-field-action.component';
import { NoxFormFieldAction } from '../data/nox-form-field-action';

@Component({
  selector: 'nox-form-field-actions',
  template: ""
})
export class NoxFormFieldActionsComponent implements AfterContentInit {
  @ContentChildren(NoxFormFieldActionComponent) actionComponents!: QueryList<NoxFormFieldActionComponent>;

  actions: NoxFormFieldAction[] = [];

  ngAfterContentInit(): void {
    if (this.actionComponents != null) {
      this.actionComponents.forEach((actionComponent: NoxFormFieldActionComponent) => {
        this.actions.push({
          name: actionComponent.name,
          icon: actionComponent.icon,
          text: actionComponent.text,
        });
      });
    }
  }
}
