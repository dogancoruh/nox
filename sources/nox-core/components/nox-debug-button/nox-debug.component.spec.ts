import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxDebugComponent } from './nox-debug.component';

describe('NoxDebugComponent', () => {
  let component: NoxDebugComponent;
  let fixture: ComponentFixture<NoxDebugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoxDebugComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoxDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
