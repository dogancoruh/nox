import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxTagsUploaderComponent } from './nox-tags-uploader.component';

describe('NoxSearchableDropDownComponent', () => {
  let component: NoxTagsUploaderComponent;
  let fixture: ComponentFixture<NoxTagsUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxTagsUploaderComponent]
    });
    fixture = TestBed.createComponent(NoxTagsUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
