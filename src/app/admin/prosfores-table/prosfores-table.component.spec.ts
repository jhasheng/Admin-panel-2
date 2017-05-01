import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsforesTableComponent } from './prosfores-table.component';

describe('ProsforesTableComponent', () => {
  let component: ProsforesTableComponent;
  let fixture: ComponentFixture<ProsforesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsforesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsforesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
