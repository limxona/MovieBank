import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListPage } from './search-list.page';

describe('SearchListPage', () => {
  let component: SearchListPage;
  let fixture: ComponentFixture<SearchListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
