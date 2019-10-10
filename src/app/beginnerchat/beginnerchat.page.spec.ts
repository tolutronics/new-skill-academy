import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginnerchatPage } from './beginnerchat.page';

describe('BeginnerchatPage', () => {
  let component: BeginnerchatPage;
  let fixture: ComponentFixture<BeginnerchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginnerchatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginnerchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
