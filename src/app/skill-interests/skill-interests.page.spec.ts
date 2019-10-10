import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillInterestsPage } from './skill-interests.page';

describe('SkillInterestsPage', () => {
  let component: SkillInterestsPage;
  let fixture: ComponentFixture<SkillInterestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillInterestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillInterestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
