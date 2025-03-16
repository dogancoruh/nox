import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxTreeDropDownComponent } from './nox-tree-drop-down.component';

describe('NoxTreeDropDownComponent', () => {
  let component: NoxTreeDropDownComponent;
  let fixture: ComponentFixture<NoxTreeDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxTreeDropDownComponent]
    });
    fixture = TestBed.createComponent(NoxTreeDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
