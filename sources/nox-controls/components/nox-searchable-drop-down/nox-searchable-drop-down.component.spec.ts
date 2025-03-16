import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxSearchableDropDownComponent } from './nox-searchable-drop-down.component';

describe('NoxSearchableDropDownComponent', () => {
  let component: NoxSearchableDropDownComponent;
  let fixture: ComponentFixture<NoxSearchableDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxSearchableDropDownComponent]
    });
    fixture = TestBed.createComponent(NoxSearchableDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
