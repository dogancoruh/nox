import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoxConfigurationService } from '../../nox-core/services/nox-configuration.service';

@Component({
  selector: 'nox-data-adapter',
  template: ""
})
export class NoxDataAdapterComponent implements OnInit {
  protected router!: Router;
  protected activatedRoute!: ActivatedRoute;
  protected configurationService!: NoxConfigurationService;
  protected changeDetectorRef!: ChangeDetectorRef;

  @Input() urlPrefix: string = "";

  @Output() onShowSpinner = new EventEmitter();
  @Output() onHideSpinner = new EventEmitter();

  constructor(protected injector: Injector) {
    this.router = this.injector.get(Router);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.configurationService = this.injector.get(NoxConfigurationService);
    this.changeDetectorRef = this.injector.get(ChangeDetectorRef);
  }

  ngOnInit(): void {
    
  }

  protected getQueryParameter(name: string, defaultValue: any): any {
    let parameterName = name;
    if (this.urlPrefix)
      parameterName = this.urlPrefix + "_" + name;

    if (this.activatedRoute.snapshot.queryParams[parameterName])
      return this.activatedRoute.snapshot.queryParams[parameterName];
    else
      return defaultValue;
  }

  protected getNameWithUrlPrefix(name: string): string {
    if (this.urlPrefix)
      return this.urlPrefix + "_" + name;
    else
      return name;
  }
}
