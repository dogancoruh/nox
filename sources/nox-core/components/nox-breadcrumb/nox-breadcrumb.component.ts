import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NoxBreadcrumbItem } from './nox-breadcrumb-item';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'nox-breadcrumb',
  templateUrl: './nox-breadcrumb.component.html',
  styleUrls: ['./nox-breadcrumb.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    FontAwesomeModule
  ]
})
export class NoxBreadcrumbComponent implements OnInit {
  @Input() items: NoxBreadcrumbItem[] = [];

  @Input() homeIconVisible: boolean = true;
  @Input() homeIcon: any;
  @Input() separatorIcon: any;
  @Input() textColor: string | undefined;

  @Output() onHome = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {

  }

  onHomeButtonClicked() {
    this.onHome.emit();
  }
}
