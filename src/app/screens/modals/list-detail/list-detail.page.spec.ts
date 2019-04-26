import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailPage } from './list-detail.page';

describe('ListDetailPage', () => {
  let component: ListDetailPage;
  let fixture: ComponentFixture<ListDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
