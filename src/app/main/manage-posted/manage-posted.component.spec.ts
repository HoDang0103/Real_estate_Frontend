import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePostedComponent } from './manage-posted.component';

describe('ManagePostedComponent', () => {
  let component: ManagePostedComponent;
  let fixture: ComponentFixture<ManagePostedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePostedComponent]
    });
    fixture = TestBed.createComponent(ManagePostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
