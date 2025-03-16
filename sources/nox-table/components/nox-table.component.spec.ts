import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxTableComponent } from './nox-table.component';

describe('NoxTableComponent', () => {
  let component: NoxTableComponent;
  let fixture: ComponentFixture<NoxTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxTableComponent]
    });
    fixture = TestBed.createComponent(NoxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
