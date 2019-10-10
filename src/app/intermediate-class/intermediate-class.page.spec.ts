import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntermediateClassPage } from './intermediate-class.page';

describe('IntermediateClassPage', () => {
  let component: IntermediateClassPage;
  let fixture: ComponentFixture<IntermediateClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntermediateClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntermediateClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
