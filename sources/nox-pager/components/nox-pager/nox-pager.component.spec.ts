import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxPagerComponent } from './nox-pager.component';

describe('NoxPagerComponent', () => {
  let component: NoxPagerComponent;
  let fixture: ComponentFixture<NoxPagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxPagerComponent]
    });
    fixture = TestBed.createComponent(NoxPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
