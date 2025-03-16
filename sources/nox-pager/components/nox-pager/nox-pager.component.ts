import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBackward, faEllipsis, faForward, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { NoxUserPageSettingsService } from '../../../nox-core/services/nox-user-page-settings.service';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';
import { StringHelper } from '../../../nox-core/classes/string-helper';
import { NoxLeftRightAlign } from '../../../nox-core/enums/nox-left-right-align';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nox-pager',
  templateUrl: './nox-pager.component.html',
  styleUrls: ['./nox-pager.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class NoxPagerComponent implements AfterViewInit, OnDestroy {
  mediaQuery!: MediaQueryList;
  mediaQueryListener!: () => void;

  faStepBackward = faStepBackward
  faBackward = faBackward;
  faForward = faForward;
  faStepForward = faStepForward;
  faEllipsis = faEllipsis;

  @Input() urlPrefix: string = "";

  @Input() pageIndex: number = 0;

  @Input() visiblePageCount: number = 5;

  private _baseVisiblePageCount: number = this.visiblePageCount;
  public get baseVisiblePageCount(): number {
    return this._baseVisiblePageCount;
  }


  @Input() totalRecordCountTextFormat: string = ""
  @Input() totalRecordCountLocation: NoxLeftRightAlign = "right";

  @Input() recordCount: number = 0;

  private _pageCount: number = 0;

  @Input()
  get pageCount(): number {
    return this._pageCount;
  }
  set pageCount(value: number) {
    this._pageCount = value;

    if (this._pageCount == 0)
      console.warn("Page count is 0 for pager");
  }

  @Input() pageSize: number = 20;
  @Input() pageSizes: string = "10,20,50";
  @Input() pageSizeVisible: boolean = true;

  @Input() moveFirstLastVisible: boolean = true;
  @Input() movePreviousNextVisible: boolean = true;

  @Input() disabled: boolean = false; // FIX: ???

  @Input() storeInPageSettings: boolean = true;

  @Output() onPageIndex = new EventEmitter();
  @Output() onPageSize = new EventEmitter();

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly configurationService: NoxConfigurationService,
    private readonly userPageSettingsService: NoxUserPageSettingsService) {

    if (!this.totalRecordCountTextFormat)
      this.totalRecordCountTextFormat = this.configurationService.pagerTotalRecordCountTextFormat;

    this.totalRecordCountLocation = this.configurationService.pagerTotalRecordCountLocation;
  }

  ngAfterViewInit(): void {
    if (this.storeInPageSettings)
      this.pageSize = this.userPageSettingsService.getInteger(this.getSettingName("pager_page_size"), this.pageSize);

    this._baseVisiblePageCount = this.visiblePageCount;

    this.mediaQuery = window.matchMedia('(max-width: 768px)');
    this.updateVisiblePageCount(this.mediaQuery.matches);

    this.mediaQueryListener = () => this.updateVisiblePageCount(this.mediaQuery.matches);
    this.mediaQuery.addEventListener('change', this.mediaQueryListener);
  }

  ngOnDestroy(): void {
    this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
  }

  updateVisiblePageCount(isSmallScreen: boolean) {
    this.visiblePageCount = isSmallScreen ? 1 : this._baseVisiblePageCount;
  }

  getPageItems() {
    const result = [];
    const visibleRange = this.visiblePageCount;
    const lastPage = this.pageCount - 1;

    if (this.pageCount <= visibleRange + 1) {
      for (let i = 0; i < this.pageCount; i++) {
        result.push({ index: i });
      }
    } else {
      let startPage = Math.max(0, Math.min(this.pageIndex - Math.floor(visibleRange / 2), lastPage - visibleRange));
      let endPage = startPage + visibleRange;

      if (endPage >= lastPage) {
        endPage = lastPage;
        startPage = Math.max(0, endPage - visibleRange);
      }

      for (let i = startPage; i < endPage; i++) {
        result.push({ index: i });
      }

      if (endPage < lastPage) {
        result.push({ index: -1 });
        result.push({ index: lastPage });
      } else if (endPage === lastPage) {
        result.push({ index: lastPage });
      }
    }

    return result;
  }

  getPageSizes(): number[] {
    let result: number[] = [];

    const pageSizeTexts = this.pageSizes.split(",");
    for (let i = 0; i < pageSizeTexts.length; i++)
      result.push(Number.parseInt(pageSizeTexts[i]));

    return result;
  }

  onFirstPageClicked() {
    this.onPageIndex.emit({
      pageIndex: 0
    });
  }

  onPreviousPageClicked() {
    if (this.pageIndex > 0) {
      this.onPageIndex.emit({
        pageIndex: this.pageIndex - 1
      });
    }
  }

  onPageClicked(index: number) {
    this.onPageIndex.emit({
      pageIndex: index
    });
  }

  onNextPageClicked() {
    if (this.pageIndex < this.pageCount - 1) {
      this.onPageIndex.emit({
        pageIndex: this.pageIndex + 1
      });
    }
  }

  onLastPageClicked() {
    this.onPageIndex.emit({
      pageIndex: this.pageCount - 1
    });
  }

  onPageSizeChanged(event: any) {
    const pageSize = Number.parseInt(event.target.value);

    if (this.storeInPageSettings)
      this.userPageSettingsService.setInteger(this.getSettingName("pager_page_size"), pageSize);

    this.onPageSize.emit({
      pageSize: pageSize
    })
  }

  getSettingName(baseName: string): string {
    let settingName = "";
    if (this.urlPrefix) {
      settingName += this.urlPrefix + "_";
    }
    settingName += "pager_page_size";
    return settingName;
  }

  getTotalRecordCountText(): string {
    return StringHelper.formatString(this.totalRecordCountTextFormat, this.recordCount);
  }
}
