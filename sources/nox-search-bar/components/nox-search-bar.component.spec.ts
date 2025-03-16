import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxSearchBarComponent } from './nox-search-bar.component';

describe('NoxSearchBarComponent', () => {
  let component: NoxSearchBarComponent;
  let fixture: ComponentFixture<NoxSearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxSearchBarComponent]
    });
    fixture = TestBed.createComponent(NoxSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
