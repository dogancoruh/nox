import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxBreadcrumbComponent } from './nox-breadcrumb.component';

describe('NoxBreadcrumbComponent', () => {
  let component: NoxBreadcrumbComponent;
  let fixture: ComponentFixture<NoxBreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxBreadcrumbComponent]
    });
    fixture = TestBed.createComponent(NoxBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
