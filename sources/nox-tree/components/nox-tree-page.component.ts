import { AfterViewInit, Component, Injector, ViewChild } from "@angular/core";
import { NoxEditPageComponent } from "../../nox-core/components/nox-page/nox-edit-page.component";
import { NoxTreeComponent } from "./nox-tree.component";
import { NoxTreeDataAdapterComponent } from "./nox-tree-data-adapter.component";

@Component({
  selector: "nox-tree-page-component",
  template: ""
})
export class NoxTreePageComponent extends NoxEditPageComponent implements AfterViewInit {
  @ViewChild(NoxTreeComponent) tree!: NoxTreeComponent;
  @ViewChild(NoxTreeDataAdapterComponent) dataAdapter!: NoxTreeDataAdapterComponent;

  constructor(override injector: Injector) {
    super(injector);
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

  }
}
