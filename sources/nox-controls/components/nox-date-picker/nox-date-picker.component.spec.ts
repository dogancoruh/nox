import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxDatePickerComponent } from './nox-date-picker.component';

describe('NoxDatePickerComponent', () => {
  let component: NoxDatePickerComponent;
  let fixture: ComponentFixture<NoxDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoxDatePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoxDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
