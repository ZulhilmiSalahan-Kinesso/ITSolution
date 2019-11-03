import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptDealPage } from './accept-deal.page';

describe('AcceptDealPage', () => {
  let component: AcceptDealPage;
  let fixture: ComponentFixture<AcceptDealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptDealPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptDealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
