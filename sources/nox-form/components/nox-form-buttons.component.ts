import { AfterContentInit, Component, ContentChildren, EventEmitter, OnChanges, Output, QueryList, SimpleChanges } from '@angular/core';
import { NoxFormButtonComponent } from './nox-form-button.component';
import { NoxFormButton } from '../data/nox-form-button';

@Component({
  selector: 'nox-form-buttons',
  template: ""
})
export class NoxFormButtonsComponent implements AfterContentInit, OnChanges {
  @ContentChildren(NoxFormButtonComponent) buttonComponents!: QueryList<NoxFormButtonComponent>;

  @Output() onChange = new EventEmitter();

  buttons: NoxFormButton[] = [];

  ngAfterContentInit(): void {
    if (this.buttonComponents != null) {
      this.buttonComponents.forEach((buttonComponent: NoxFormButtonComponent) => {
        buttonComponent.onChange.subscribe((changes: SimpleChanges) => {
          this.buttonComponents.forEach((buttonComponent: NoxFormButtonComponent) => {
            this.buttons.forEach((item: NoxFormButton) => {
              if (buttonComponent.id == item.id) {
                item.name = buttonComponent.name;
                item.type = buttonComponent.type;
                item.enabled = buttonComponent.enabled;
                item.visible = buttonComponent.visible;
                item.appearance = buttonComponent.appearance;
                item.title = buttonComponent.title;
                item.link = buttonComponent.link;
                item.validation = buttonComponent.validation;
              }
            });
          });

          this.onChange.emit(changes);
        });

        this.buttons.push({
          id: buttonComponent.id,
          name: buttonComponent.name,
          type: buttonComponent.type,
          enabled : buttonComponent.enabled,
          visible: buttonComponent.visible,
          appearance: buttonComponent.appearance,
          title: buttonComponent.title,
          link: buttonComponent.link,
          validation: buttonComponent.validation
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.info("buttons changed!");
  }
}
