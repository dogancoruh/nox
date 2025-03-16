import { AfterViewInit, Component, Input } from "@angular/core";

@Component({
  selector: 'nox-layout-console-output',
  template: ''
})
export class NoxLayoutConsoleOutputComponent implements AfterViewInit {
  @Input() info: string | undefined;
  @Input() warn: string | undefined;
  @Input() debug: string | undefined;
  @Input() error: string | undefined;

  constructor() {
    
  }

  ngAfterViewInit(): void {
    if (this.info)
      console.info(this.info);
    if (this.warn)
      console.warn(this.warn);
    if (this.debug)
      console.debug(this.debug);
    if (this.error)
      console.error(this.error);
  }
}
