import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDealPage } from './create-deal.page';

describe('CreateDealPage', () => {
  let component: CreateDealPage;
  let fixture: ComponentFixture<CreateDealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDealPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
