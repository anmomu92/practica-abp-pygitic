import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUserImageComponent } from './upload-user-image.component';

describe('UploadUserImageComponent', () => {
  let component: UploadUserImageComponent;
  let fixture: ComponentFixture<UploadUserImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadUserImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
