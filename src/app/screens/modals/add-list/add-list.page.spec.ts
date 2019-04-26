import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListPage } from './add-list.page';

describe('AddListPage', () => {
  let component: AddListPage;
  let fixture: ComponentFixture<AddListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
