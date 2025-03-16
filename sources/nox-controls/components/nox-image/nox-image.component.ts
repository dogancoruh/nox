import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { NoxConfigurationService } from '../../../nox-core/services/nox-configuration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'nox-image',
  templateUrl: './nox-image.component.html',
  styleUrl: './nox-image.component.scss'
})
export class NoxImageComponent implements AfterViewInit {
  image: any;
  spinnerVisible: boolean = false;
  isLoaded: boolean = false;

  @Input() src: any;
  @Input() placeholder: string = "assets/nox/components/nox-image/image-placeholder.svg";

  constructor(private readonly configurationService: NoxConfigurationService,
    private readonly httpClient: HttpClient,
    private readonly changeDetectorRef: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.image = this.placeholder;

    this.spinnerVisible = true;
    this.httpClient.get(this.src, { responseType: "blob" }).subscribe((result: any) => {
      let fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.image = fileReader.result;
        this.isLoaded = true;
        this.spinnerVisible = false;

        this.changeDetectorRef.detectChanges();
      }, false);
      
      fileReader.readAsDataURL(result);
    }, (error: any) => {
      this.spinnerVisible = false;
      this.image = this.placeholder;

      this.changeDetectorRef.detectChanges();
    });
  }
}
