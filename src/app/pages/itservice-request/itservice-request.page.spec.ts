import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ITServiceRequestPage } from './itservice-request.page';

describe('ITServiceRequestPage', () => {
  let component: ITServiceRequestPage;
  let fixture: ComponentFixture<ITServiceRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ITServiceRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ITServiceRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
