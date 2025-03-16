import { AfterViewInit, Component, Injector, OnInit, SimpleChanges, ViewChild, AfterContentInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NoxPagePreferencesService } from '../../services/nox-page-preferences.service';
import { NoxPagePreferencesComponent } from '../nox-page-preferences/nox-page-preferences.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NoxBreadcrumbItem } from '../nox-breadcrumb/nox-breadcrumb-item';
import { NgxSpinnerService } from 'ngx-spinner';
import { NoxConfigurationService } from '../../services/nox-configuration.service';
import { NoxPageActionButton } from '../nox-page-action-button/nox-page-action-button';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NoxUserPageSettingsService } from '../../services/nox-user-page-settings.service';
import { Location } from '@angular/common';

@Component({
  template: "",
  standalone: true
})
export class NoxPageComponent implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild(NoxPagePreferencesComponent) pagePreferencesComponent!: NoxPagePreferencesComponent;

  protected readonly pagePreferencesService: NoxPagePreferencesService;
  protected readonly configurationService: NoxConfigurationService;
  protected readonly changeDetectorRef: ChangeDetectorRef;
  protected readonly router: Router;
  protected readonly activatedRoute: ActivatedRoute;
  protected readonly spinnerService: NgxSpinnerService;
  protected readonly toastrService: ToastrService;
  protected readonly userPageSettingsService: NoxUserPageSettingsService;
  protected readonly location: Location;

  private _title: string | undefined = "";

  protected get title(): string | undefined {
    return this._title;
  }
  protected set title(value: string | undefined) {
    this._title = value;

    this.pagePreferencesService.title$.next(this._title);
  }

  private _titleVisible: boolean | undefined = true;

  protected get titleVisible(): boolean | undefined {
    return this._titleVisible;
  }
  protected set titleVisible(value: boolean | undefined) {
    this._titleVisible = value;

    this.pagePreferencesService.titleVisible$.next(this._titleVisible);
  }

  private _section: string | undefined = "";

  protected get section(): string | undefined {
    return this._section;
  }
  protected set section(value: string | undefined) {
    this._section = value;

    this.pagePreferencesService.section$.next(this._section);
  }

  private _breadcrumbItems: NoxBreadcrumbItem[] = [];

  get breadcrumbItems(): NoxBreadcrumbItem[] {
    return this._breadcrumbItems;
  }
  set breadcrumbItems(value: NoxBreadcrumbItem[]) {
    this._breadcrumbItems = value;

    this.pagePreferencesService.breadcrumbItems$.next(this._breadcrumbItems);
  }

  private _actionButtons: NoxPageActionButton[] = [];

  get actionButtons(): NoxPageActionButton[] {
    return this._actionButtons;
  }
  set actionButtons(value: NoxPageActionButton[]) {
    this._actionButtons = value;

    this.pagePreferencesService.actionButtons$.next(this._actionButtons);
  }

  constructor(protected injector: Injector) {
    this.pagePreferencesService = this.injector.get(NoxPagePreferencesService);
    this.configurationService = this.injector.get(NoxConfigurationService);
    this.changeDetectorRef = this.injector.get(ChangeDetectorRef);
    this.router = this.injector.get(Router);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.spinnerService = this.injector.get(NgxSpinnerService);
    this.toastrService = this.injector.get(ToastrService);
    this.userPageSettingsService = this.injector.get(NoxUserPageSettingsService);
    this.location = this.injector.get(Location);
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.pagePreferencesComponent != null) {
      if (this.pagePreferencesComponent.titleVisible != undefined)

      this.pagePreferencesComponent.onChange.subscribe((changes: SimpleChanges) => {
        if (this.pagePreferencesComponent.title != undefined)
          this.title = this.pagePreferencesComponent.title;
        
        if (this.pagePreferencesComponent.titleVisible != undefined)
          this.titleVisible = this.pagePreferencesComponent.titleVisible;

        if (this.pagePreferencesComponent.section != undefined) {
          if (this.pagePreferencesComponent.section != "")
            this.section = this.pagePreferencesComponent.section;
        } else {
          console.warn("Section is not defined for page");
        }
          
        this.breadcrumbItems = this.pagePreferencesComponent.breadcrumbItems;
        this.actionButtons = this.pagePreferencesComponent.actionButtons;
      });

      if (this.pagePreferencesComponent.title != undefined)
        this.title = this.pagePreferencesComponent.title;
      
      if (this.pagePreferencesComponent.titleVisible != undefined)
        this.titleVisible = this.pagePreferencesComponent.titleVisible;
      
      if (this.pagePreferencesComponent.section != undefined) {
        if (this.pagePreferencesComponent.section != "")
          this.section = this.pagePreferencesComponent.section;
      } else {
        console.warn("Section is not defined for page");
      }
      
      this.breadcrumbItems = this.pagePreferencesComponent.breadcrumbItems;
      this.actionButtons = this.pagePreferencesComponent.actionButtons;
    }
  }

  protected showSpinner(): void {
    this.spinnerService.show();
  }

  protected hideSpinner(): void {
    this.spinnerService.hide();
  }

  protected onShowSpinner() {
    this.showSpinner();
  }

  protected onHideSpinner() {
    this.hideSpinner();
  }

  protected getRouteParameterAsString(name: string, defaultValue: string | undefined = undefined): string | undefined {
    if (this.activatedRoute.snapshot.data[name])
      return this.activatedRoute.snapshot.data[name];
    else
      return defaultValue;
  }

  protected getRouteParameterAsInteger(name: string, defaultValue: number | undefined = undefined): number | undefined {
    if (this.activatedRoute.snapshot.data[name])
      return Number.parseInt(this.activatedRoute.snapshot.data[name]);
    else
      return defaultValue;
  }

  protected getRouteParameterAsFloat(name: string, defaultValue: number | undefined = undefined): number | undefined {
    if (this.activatedRoute.snapshot.data[name])
      return Number.parseFloat(this.activatedRoute.snapshot.data[name]);
    else
      return defaultValue;
  }

  protected getParameterAsString(name: string, defaultValue: string | undefined = undefined): string | undefined {
    if (this.activatedRoute.snapshot.params[name])
      return this.activatedRoute.snapshot.params[name];
    else
      return defaultValue;
  }

  protected getParameterAsInteger(name: string, defaultValue: number | undefined = undefined): number | undefined {
    if (this.activatedRoute.snapshot.params[name])
      return Number.parseInt(this.activatedRoute.snapshot.params[name]);
    else
      return defaultValue;
  }

  protected getParameterAsFloat(name: string, defaultValue: number | undefined = undefined): number | undefined {
    if (this.activatedRoute.snapshot.params[name])
      return Number.parseFloat(this.activatedRoute.snapshot.params[name]);
    else
      return defaultValue;
  }

  protected getQueryParameterAsString(name: string, defaultValue: string | undefined = undefined): string | undefined {
    if (this.activatedRoute.snapshot.queryParams[name])
      return this.activatedRoute.snapshot.queryParams[name];
    else
      return defaultValue;
  }

  protected getQueryParameterAsInteger(name: string, defaultValue: number | undefined = undefined): number | undefined {
    if (this.activatedRoute.snapshot.queryParams[name])
      return Number.parseInt(this.activatedRoute.snapshot.queryParams[name]);
    else
      return defaultValue;
  }

  protected getQueryParameterAsFloat(name: string, defaultValue: number | undefined = undefined): number | undefined {
    if (this.activatedRoute.snapshot.queryParams[name])
      return Number.parseFloat(this.activatedRoute.snapshot.queryParams[name]);
    else
      return defaultValue;
  }

  protected getQueryParameterAsBoolean(name: string, defaultValue: boolean | undefined = undefined): boolean | undefined {
    if (this.activatedRoute.snapshot.queryParams[name])
      return this.activatedRoute.snapshot.queryParams[name].toLower() == "true";
    else
      return defaultValue;
  }

  protected query(name: string): string | undefined {
    return this.getParameterAsString(name);
  }

  protected navigate(link: string) {
    this.router.navigate([link]);
  }

  protected detectChanges() {
    this.changeDetectorRef.detectChanges();
  }

  // toastr functions
  protected showToastr<ConfigPayload = any>(message?: string, title?: string, override?: Partial<IndividualConfig<ConfigPayload>>, type?: string) {
    this.toastrService.show(message, title, override, type);
  }

  protected showToastrSuccess(message?: string | undefined, title?: string | undefined) {
    this.toastrService.success(message, title);
  }

  protected showToasterInfo(message?: string | undefined, title?: string | undefined) {
    this.toastrService.info(message, title);
  }

  protected showToasterWarning(message?: string | undefined, title?: string | undefined) {
    this.toastrService.warning(message, title);
  }

  protected showToasterError(message?: string | undefined, title?: string | undefined) {
    this.toastrService.error(message, title);
  }

  protected clearToaster() {
    this.toastrService.clear();
  }

  protected getDataParameterAsString(name: string, defaultValue: string | undefined = undefined): string | undefined {
    if (this.activatedRoute.snapshot.data[name])
      return this.activatedRoute.snapshot.data[name];
    else
      return defaultValue;
  }

  protected getDataParameterAsNumber(name: string, defaultValue: number | undefined = undefined): number | undefined {
    if (this.activatedRoute.snapshot.data[name])
      return Number.parseInt(this.activatedRoute.snapshot.data[name]);
    else
      return defaultValue;
  }

  protected getDataParameterAsFloat(name: string, defaultValue: number | undefined = undefined): number | undefined {
    if (this.activatedRoute.snapshot.data[name])
      return Number.parseFloat(this.activatedRoute.snapshot.data[name]);
    else
      return defaultValue;
  }

  protected getDataParameterAsBoolean(name: string, defaultValue: boolean | undefined = undefined): boolean | undefined {
    if (this.activatedRoute.snapshot.data[name])
      return this.activatedRoute.snapshot.data[name].toLower() == "true";
    else
      return defaultValue;
  }

  protected scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  protected scrollToElement(element: ElementRef) {
    setTimeout(() => {
      element.nativeElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 300);
  }

  setSettingsString(name: string, value: string, expires?: number | Date) {
    this.userPageSettingsService.setString(name, value, expires);
  }

  getSettingsString(name: string, defaultValue?: string): string {
    return this.userPageSettingsService.getString(name, defaultValue);
  }

  setSettingsInteger(name: string, value: number, expires?: number | Date) {
    this.userPageSettingsService.setInteger(name, value, expires);
  }

  getSettingsInteger(name: string, defaultValue?: number): number {
    return this.userPageSettingsService.getInteger(name, defaultValue);
  }

  setSettingsFloat(name: string, value: number, expires?: number | Date) {
    this.userPageSettingsService.setFloat(name, value, expires);
  }

  getSettingsFloat(name: string, defaultValue?: number): number {
    return this.userPageSettingsService.getFloat(name, defaultValue);
  }

  setSettingsBoolean(name: string, value: boolean, expires?: number | Date) {
    this.userPageSettingsService.setBoolean(name, value, expires);
  }

  getSettingsBoolean(name: string, defaultValue?: boolean): boolean {
    return this.userPageSettingsService.getBoolean(name, defaultValue);
  }

  navigateToBack() {
    this.location.back();
  }
}
