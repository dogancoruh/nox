import { AfterContentInit, Component, ContentChildren, EventEmitter, OnChanges, Output, QueryList, SimpleChanges } from "@angular/core";
import { NoxBreadcrumbItem } from "./nox-breadcrumb-item";
import { NoxBreadcrumbItemComponent } from "./nox-breadcrumb-item.component";

@Component({
  selector: 'nox-breadcrumb-items',
  template: ''
})
export class NoxBreadcrumbItemsComponent implements AfterContentInit {
  @ContentChildren(NoxBreadcrumbItemComponent) itemComponents!: QueryList<NoxBreadcrumbItemComponent>;

  @Output() onChange = new EventEmitter();

  items: NoxBreadcrumbItem[] = [];

  ngAfterContentInit(): void {
    if (this.itemComponents != null) {
      this.itemComponents.forEach((itemComponent: NoxBreadcrumbItemComponent) => {
        itemComponent.onChange.subscribe((changes: SimpleChanges) => {
          this.itemComponents.forEach((itemComponent: NoxBreadcrumbItemComponent) => {
            this.items.forEach((item: NoxBreadcrumbItem) => {
              if (itemComponent.id == item.id) {
                item.title = itemComponent.title;
                item.icon = itemComponent.icon;
                item.link = itemComponent.link;
              }
            });
          });

          this.onChange.emit(changes);
        });

        this.items.push({
          id: itemComponent.id,
          title: itemComponent.title,
          icon: itemComponent.icon,
          link: itemComponent.link
        });
      });
    }
  }
}
