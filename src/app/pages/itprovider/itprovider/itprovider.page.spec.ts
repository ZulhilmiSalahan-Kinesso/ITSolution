import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ITProviderPage } from './itprovider.page';

describe('ITProviderPage', () => {
  let component: ITProviderPage;
  let fixture: ComponentFixture<ITProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ITProviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ITProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
