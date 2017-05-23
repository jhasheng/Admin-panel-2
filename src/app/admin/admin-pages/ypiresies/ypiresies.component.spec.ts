import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YpiresiesComponent } from './ypiresies.component';

describe('YpiresiesComponent', () => {
  let component: YpiresiesComponent;
  let fixture: ComponentFixture<YpiresiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YpiresiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YpiresiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
