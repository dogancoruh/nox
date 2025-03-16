import { Component, Injector, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { NoxDataAdapterComponent } from "./nox-data-adapter.component";

@Component({
  selector: 'nox-server-data-adapter',
  template: ''
})
export class NoxServerDataAdapterComponent extends NoxDataAdapterComponent {
    protected subscription!: Subscription | undefined;

    @Input() autoGetData: boolean = false;
    @Input() getDataFailText: string = "Data error";

    constructor(override injector: Injector) {
        super(injector);
    }
}