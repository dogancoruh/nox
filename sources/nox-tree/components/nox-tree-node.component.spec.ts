import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxTreeNodeComponent } from './nox-tree-node.component';

describe('NoxTreeNodeComponent', () => {
  let component: NoxTreeNodeComponent;
  let fixture: ComponentFixture<NoxTreeNodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxTreeNodeComponent]
    });
    fixture = TestBed.createComponent(NoxTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
