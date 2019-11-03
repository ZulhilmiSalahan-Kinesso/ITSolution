import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingPage } from './create-listing.page';

describe('CreateListingPage', () => {
  let component: CreateListingPage;
  let fixture: ComponentFixture<CreateListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateListingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
