import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsforaDetailsComponent } from './prosfora-details.component';

describe('ProsforaDetailsComponent', () => {
  let component: ProsforaDetailsComponent;
  let fixture: ComponentFixture<ProsforaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsforaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsforaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
