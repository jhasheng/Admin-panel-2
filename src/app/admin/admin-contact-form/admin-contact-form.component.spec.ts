import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactFormComponent } from './admin-contact-form.component';

describe('AdminContactFormComponent', () => {
  let component: AdminContactFormComponent;
  let fixture: ComponentFixture<AdminContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
