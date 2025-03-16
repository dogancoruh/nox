import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoxDragAndDropUploaderComponent } from './nox-drag-and-drop-uploader.component';

describe('NoxSearchableDropDownComponent', () => {
  let component: NoxDragAndDropUploaderComponent;
  let fixture: ComponentFixture<NoxDragAndDropUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoxDragAndDropUploaderComponent]
    });
    fixture = TestBed.createComponent(NoxDragAndDropUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
