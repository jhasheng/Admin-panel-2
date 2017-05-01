import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeDeleteProsforaComponent } from './dialoge-delete-prosfora.component';

describe('DialogeDeleteProsforaComponent', () => {
  let component: DialogeDeleteProsforaComponent;
  let fixture: ComponentFixture<DialogeDeleteProsforaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogeDeleteProsforaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogeDeleteProsforaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
