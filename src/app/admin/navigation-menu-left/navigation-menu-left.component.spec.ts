import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMenuLeftComponent } from './navigation-menu-left.component';

describe('NavigationMenuLeftComponent', () => {
  let component: NavigationMenuLeftComponent;
  let fixture: ComponentFixture<NavigationMenuLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationMenuLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
