import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProviderPage } from './details-provider.page';

describe('DetailsProviderPage', () => {
  let component: DetailsProviderPage;
  let fixture: ComponentFixture<DetailsProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
