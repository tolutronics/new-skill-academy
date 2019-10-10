import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcoursePage } from './addnewcourse.page';

describe('AddnewcoursePage', () => {
  let component: AddnewcoursePage;
  let fixture: ComponentFixture<AddnewcoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewcoursePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewcoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
