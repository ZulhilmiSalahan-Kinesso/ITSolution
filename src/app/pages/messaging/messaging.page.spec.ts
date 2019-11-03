import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingPage } from './messaging.page';

describe('MessagingPage', () => {
  let component: MessagingPage;
  let fixture: ComponentFixture<MessagingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
