import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxImageComponent } from './nox-image.component';

describe('NoxImageComponent', () => {
  let component: NoxImageComponent;
  let fixture: ComponentFixture<NoxImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoxImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoxImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
