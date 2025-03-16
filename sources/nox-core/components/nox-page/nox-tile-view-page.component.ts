import { AfterViewInit, Component, Injector, ViewChild } from "@angular/core";
import { NoxEditPageComponent } from "./nox-edit-page.component";
import { NoxFormComponent } from "../../../nox-form/components/nox-form.component";
import { NoxFormDataAdapterComponent } from "../../../nox-form/components/nox-form-data-adapter.component";
import { NoxTileViewComponent } from "../../../nox-tile-view/components/nox-tile-view.component";

@Component({
  selector: "nox-tile-view-page-component",
  template: ""
})
export class NoxTileViewPageComponent extends NoxEditPageComponent implements AfterViewInit {
  @ViewChild(NoxTileViewComponent) tileView!: NoxTileViewComponent;
  @ViewChild(NoxFormDataAdapterComponent) tileViewAdapter!: NoxFormDataAdapterComponent;

  constructor(override injector: Injector) {
    super(injector);
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    // if (this.form) {
    //   this.form.onSubmit.subscribe(() => {
    //   });
    // }
  }
}
