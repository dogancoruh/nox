import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxDateTimePickerComponent } from './nox-date-time-picker.component';

describe('NoxDatePickerComponent', () => {
  let component: NoxDateTimePickerComponent;
  let fixture: ComponentFixture<NoxDateTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoxDateTimePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoxDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
