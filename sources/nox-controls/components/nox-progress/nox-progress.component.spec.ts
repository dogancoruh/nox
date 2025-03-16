import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoxProgressComponent } from './nox-progress.component';

describe('NoxProgressComponent', () => {
  let component: NoxProgressComponent;
  let fixture: ComponentFixture<NoxProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoxProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoxProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
