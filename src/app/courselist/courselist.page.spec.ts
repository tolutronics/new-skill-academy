import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourselistPage } from './courselist.page';

describe('CourselistPage', () => {
  let component: CourselistPage;
  let fixture: ComponentFixture<CourselistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourselistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourselistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
