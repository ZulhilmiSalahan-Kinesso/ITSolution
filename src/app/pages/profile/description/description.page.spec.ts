import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionPage } from './description.page';

describe('DescriptionPage', () => {
  let component: DescriptionPage;
  let fixture: ComponentFixture<DescriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
