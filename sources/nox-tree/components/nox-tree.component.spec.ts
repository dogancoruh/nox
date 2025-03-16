import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxTreeComponent } from './nox-tree.component';

describe('NoxTreeComponent', () => {
  let component: NoxTreeComponent;
  let fixture: ComponentFixture<NoxTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxTreeComponent]
    });
    fixture = TestBed.createComponent(NoxTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
