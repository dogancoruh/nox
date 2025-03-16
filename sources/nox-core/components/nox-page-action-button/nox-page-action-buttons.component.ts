import { AfterContentInit, Component, ContentChildren, EventEmitter, OnChanges, Output, QueryList, SimpleChanges } from "@angular/core";
import { NoxPageActionButtonComponent } from "./nox-page-action-button.component";
import { NoxPageActionButton } from "./nox-page-action-button";

@Component({
  selector: 'nox-page-action-buttons',
  template: ''
})
export class NoxPageActionButtonsComponent implements AfterContentInit {
  @ContentChildren(NoxPageActionButtonComponent) buttonComponents!: QueryList<NoxPageActionButtonComponent>;

  @Output() onChange = new EventEmitter();

  buttons: NoxPageActionButton[] = [];

  ngAfterContentInit(): void {
    if (this.buttonComponents != null) {
      this.buttonComponents.forEach((itemComponent: NoxPageActionButtonComponent) => {
        itemComponent.onChange.subscribe((changes: SimpleChanges) => {
          this.buttonComponents.forEach((itemComponent: NoxPageActionButtonComponent) => {
            this.buttons.forEach((item: NoxPageActionButton) => {
              if (itemComponent.id == item.id) {
                item.icon = itemComponent.icon;
                item.name = itemComponent.name;
                item.text = itemComponent.text;
              }
            });
          });

          this.onChange.emit(changes);
        });

        this.buttons.push({
          id: itemComponent.id,
          icon: itemComponent.icon,
          name: itemComponent.name,
          text: itemComponent.text
        });
      });
    }
  }
}
