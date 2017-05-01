import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddProsforaComponent } from './dialog-add-prosfora.component';

describe('DialogAddProsforaComponent', () => {
  let component: DialogAddProsforaComponent;
  let fixture: ComponentFixture<DialogAddProsforaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddProsforaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddProsforaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
