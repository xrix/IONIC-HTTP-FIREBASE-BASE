import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFirePage } from './login-fire.page';

describe('LoginFirePage', () => {
  let component: LoginFirePage;
  let fixture: ComponentFixture<LoginFirePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFirePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
