import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxTimePickerComponent } from './nox-time-picker.component';

describe('NoxDatePickerComponent', () => {
  let component: NoxTimePickerComponent;
  let fixture: ComponentFixture<NoxTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoxTimePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoxTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
