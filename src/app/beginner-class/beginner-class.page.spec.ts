import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginnerClassPage } from './beginner-class.page';

describe('BeginnerClassPage', () => {
  let component: BeginnerClassPage;
  let fixture: ComponentFixture<BeginnerClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginnerClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginnerClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
