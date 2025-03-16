import { AfterViewInit, Component, Injector, ViewChild } from "@angular/core";
import { NoxEditPageComponent } from "./nox-edit-page.component";
import { NoxFormComponent } from "../../../nox-form/components/nox-form.component";
import { NoxFormDataAdapterComponent } from "../../../nox-form/components/nox-form-data-adapter.component";

@Component({
  selector: "nox-form-page-component",
  template: ""
})
export class NoxFormPageComponent extends NoxEditPageComponent implements AfterViewInit {
  @ViewChild(NoxFormComponent) form!: NoxFormComponent;
  @ViewChild(NoxFormDataAdapterComponent) dataAdapter!: NoxFormDataAdapterComponent;

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
