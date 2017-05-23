import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsforesComponent } from './prosfores.component';

describe('ProsforesComponent', () => {
  let component: ProsforesComponent;
  let fixture: ComponentFixture<ProsforesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsforesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsforesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
