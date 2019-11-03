import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDealPage } from './final-deal.page';

describe('FinalDealPage', () => {
  let component: FinalDealPage;
  let fixture: ComponentFixture<FinalDealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalDealPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalDealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
