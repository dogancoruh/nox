import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxFormComponent } from './nox-form.component';

describe('NoxFormComponent', () => {
  let component: NoxFormComponent;
  let fixture: ComponentFixture<NoxFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxFormComponent]
    });
    fixture = TestBed.createComponent(NoxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
