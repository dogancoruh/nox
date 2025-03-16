import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoxRepeaterComponent } from './nox-repeater.component';

describe('NoxRepeaterComponent', () => {
  let component: NoxRepeaterComponent;
  let fixture: ComponentFixture<NoxRepeaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoxRepeaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoxRepeaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
